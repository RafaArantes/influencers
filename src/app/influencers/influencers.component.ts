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
  scroll = (): void => {
    this.maxShowdElements = document.documentElement.scrollTop + document.documentElement.clientHeight == document.documentElement.scrollHeight ? this.maxShowdElements + 10 : this.maxShowdElements
    this.filterFunction()
  }
  filterNumberInput: number = 0
  filterInput: Tags[]
  sort: string = 'Followers,desc'

  constructor(
    private filterByMethod: FilterByService,
    private sortByMethod: SortByService,
    private http: HttpClient
  ) {}

  changeFilter(){
    this.filterInput = []
    this.filterNumberInput = 0
    this.filterFunction()
  }
  filterFunction(){
    const filterProps = this.filter == `Follower` ? this.filterNumberInput : this.filterInput ? this.filterInput.map(x => x.value) : []
    this.newInfluencers = this.sortFunction(this.filterByMethod.filterBy(this.influencers, this.filter, filterProps)).slice(0, this.maxShowdElements)
  }
  sortFunction(influencers: Influencer[]){
    const sortPopulator = this.sort.split(',')
    return this.sortByMethod.sortBy(influencers, sortPopulator[0], sortPopulator[1])
  }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);

    this.http.get('http://localhost:8080/influencers').subscribe((x: ServerResponse) => {
      this.influencers = this.sortFunction(x.records)
      this.newInfluencers = this.influencers.slice(0, this.maxShowdElements)
    })
  }

}
