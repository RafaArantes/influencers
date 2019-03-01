import { Component, OnInit } from '@angular/core';
import { SortByService } from '../sort-by.service'
import { FilterByService } from '../filter-by.service'
import { HttpClient } from '@angular/common/http';

interface Influencer {
  _id: string;
  username: string;
  fullName: string;
  picture: string;
  biography: string;
  followerCount: number;
  stats: stats;
}
interface stats {
  followerCount: number;
  interests: (string|number)[];
  engagement: Engagement;
}
interface Engagement {
  avgCommentsRatio: number;
  avgLikesRatio: number;
}
interface Tags {
  display: number|string;
  value: number|string;
}
interface ServerResponse {
  code: number;
  records: Influencer[];
}

@Component({
  selector: 'app-influencers',
  templateUrl: './influencers.component.html',
  styleUrls: ['./influencers.component.css']
})
export class InfluencersComponent implements OnInit {

  influencers: Influencer[]
  newInfluencers: Influencer[]
  filter: string = "Follower"
  maxShowdElements: number = 10
  filterNumberInput: number = 0
  filterInput: Tags[]
  sort: string = 'Followers,desc'

  constructor(
    private filterByMethod: FilterByService,
    private sortByMethod: SortByService,
    private http: HttpClient
  ) {}

  changeFilter(){
    //This function handles the change of the filter select in the influencers page.
    //It clears all post filtered parameters and sets them to initial state.
    //After that it executes the "filterFunction" again, to repopulate all influencers without the influence of any filters

    this.filterInput = []
    this.filterNumberInput = 0
    this.filterFunction()
  }

  filterFunction(){
    //filterProps checks if the kind of filter, and receives two kinds of arguments, one for "Followers" and other for the rest.
    //After that, the "filterProps" are passed to "filterByMethod" service, that has the "filterBy" method, which filters and returns the
    //influencers object filtered. Then, those filtered influencers are sorted via "sortFunction" and the value returned from it is setted in newInfluencers variable.

    const filterProps = this.filter == `Follower` ? this.filterNumberInput : this.filterInput ? this.filterInput.map(x => x.value) : []

    this.newInfluencers = this.sortFunction(
        this.filterByMethod.filterBy(this.influencers, this.filter, filterProps)
      ).slice(0, this.maxShowdElements)
  }

  sortFunction(influencers: Influencer[]){
    //sortPopulator receives a string from the filter select via ngModel separeated by a "," and splits it into two strings in a array.
    //First string means the sort method it uses, the secondary string means in the array means the order.
    //After that, both are sent to "SortByMethod" service, that have a method inside it called "sortBy", that takes care of the sorting and return
    //the array of influences sorted by the "sortPopulator" parameters.

    const sortPopulator: string[] = this.sort.split(',')

    return this.sortByMethod.sortBy(influencers, sortPopulator[0], sortPopulator[1])
  }

  scrollHandler(){
    // maxShowdElements is a variable that takes care of how much elements are showd on page.
    // if the scroll reaches the bottom of the page, it increases the number of elements by 10
    // after it, the "filterFunction" is executed again to repopulate the page with the number of elements set in the maxShowdElements variable.

    this.maxShowdElements = document.documentElement.scrollTop + document.documentElement.clientHeight == document.documentElement.scrollHeight ?
                              this.maxShowdElements + 10 :
                              this.maxShowdElements
    this.filterFunction()
  }

  ngOnInit() {
    // Creates the event listener to detect scroll movement,
    // When it occurs, the lambda function triggers the method "scrollHandler"

    window.addEventListener('scroll', () => this.scrollHandler(), true);

    // Makes a http request and asigns the value returned to the "sortFunction", which sorts and returns a array of influencers that will be assigned to
    // the "influencers" variable. After that, the "newInfluencers" variable uses the "influencers" variable array and slices it to match the length
    // set in "maxShowdElements" variable.

    this.http.get('http://localhost:8080/influencers').subscribe((x: ServerResponse) => {
      this.influencers = this.sortFunction(x.records)
      this.newInfluencers = this.influencers.slice(0, this.maxShowdElements)
    })
  }

}
