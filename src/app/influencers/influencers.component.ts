import { Component, OnInit } from '@angular/core';
import { SortByService } from '../services/sort-by.service'
import { FilterByService } from '../services/filter-by.service'
import { IdGeneratorService } from '../services/id-generator.service'
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
interface Range {
  type: string;
  min: number;
  max: number;
}
interface Range {
  id: number;
  type: string;
  min: number;
  max: number;
}

interface Difference {
  id: number;
  type: string
  tags: Tags[]
}

@Component({
  selector: 'app-influencers',
  templateUrl: './influencers.component.html',
  styleUrls: ['./influencers.component.css']
})
export class InfluencersComponent implements OnInit {

  influencers: Influencer[]
  newInfluencers: Influencer[]
  filter: string = "follower"
  maxShowdElements: number = 10
  filterNumberMin: number
  filterNumberMax: number
  filterInput: Tags[]
  recursiveNumber: number = 0
  filters: (Range|Difference)[] = []
  sort: string = 'Followers,desc'

  constructor(
    private filterByMethod: FilterByService,
    private sortByMethod: SortByService,
    private idGenerator: IdGeneratorService,
    private http: HttpClient
  ) {}

  clearFilters(){
    this.filterInput = undefined
    this.filterNumberMax = undefined
    this.filterNumberMin = undefined
  }



  handleFilterAdd(){
    if(this.filter == "follower") {
      (this.filterNumberMin || this.filterNumberMax) && this.filters.push({
        id: this.idGenerator.generateId(),
        type: this.filter,
        min: this.filterNumberMin ? this.filterNumberMin : 0,
        max: this.filterNumberMax ? this.filterNumberMax : Infinity
      })
    } else {
      this.filterInput &&
        this.filters.push({
          id: this.idGenerator.generateId(),
          type: this.filter,
          tags: this.filterInput
        })
    }
  }

  removeFilter(id){
    this.filters = this.filters.filter(filter => filter.id != id)
    this.clearFilters()
    this.repopulateInfluencers()
  }

  applyFilters(filters){
    const hasFilter = filters.find(filter => filter.type == this.filter)
    if(hasFilter) this.filters = filters.filter(filter => filter.id != hasFilter.id)
    this.handleFilterAdd()
    this.repopulateInfluencers()
  }

  repopulateInfluencers(){
    this.filters.length > 0 && this.filters.forEach((filter, index) => {
      console.log(this.filterFunction(this.influencers, filter))
      if(index == 0) this.newInfluencers = this.sortFunction(this.filterFunction(this.influencers, filter))
      else this.newInfluencers = this.sortFunction(this.filterFunction(this.newInfluencers, filter))
    })

    if(this.filters.length == 0) this.newInfluencers = this.sortFunction(this.influencers).slice(0, this.maxShowdElements)
  }

  filterFunction(influencers, filterProps){
    return filterProps.type == "follower" ? this.sortFunction(this.filterByMethod.filterBy(influencers, filterProps.type, [filterProps.min, filterProps.max])) : this.sortFunction(this.filterByMethod.filterBy(influencers, filterProps.type, filterProps.tags.map(tag => tag.value)))
  }

  sortFunction(influencers: Influencer[]){

    const sortPopulator: string[] = this.sort.split(',')
    return this.sortByMethod.sortBy(influencers, sortPopulator[0], sortPopulator[1])
  }

  scrollHandler(){

    this.maxShowdElements = document.documentElement.scrollTop + document.documentElement.clientHeight == document.documentElement.scrollHeight ?
                              this.maxShowdElements + 10 :
                              this.maxShowdElements

    this.repopulateInfluencers()
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
