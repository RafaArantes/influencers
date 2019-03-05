import { Component, OnInit } from '@angular/core';
import { SortByService } from '../services/sort-by.service'
import { FilterByService } from '../services/filter-by.service'
import * as _ from 'lodash';
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
interface ServerResponse {
  code: number;
  records: Influencer[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //Influencers base array. Should be set on ngInit and shouldn't be changed.
  influencers: Influencer[]

  //Influencers top ten variable. It's sorted by number of followers and it's filtered by the first ten results.
  influencersTopTen: Influencer[] = []

  //Most influent variable. Should be sorted by influency levels from most to least. Can be filtered by any of the filter methods
  influencersMostInfluent: Influencer[] = []

  //Least influent variable. Should be sorted by influency levels from least to most. Can be filtered by any of the filter methods
  influencersLeastInfluent: Influencer[] = []

  constructor(
    private filterByMethod: FilterByService,
    private sortByMethod: SortByService,
    private http: HttpClient
  ) {

  }

  ngOnInit() {
    // Makes a http request and asigns the value returned to the "sortBy" method in the "SortByMethod" service, which sorts and returns a array of influencers that will be assigned to
    // the "influencers" variable. After that, the "influencersTopTen" variable uses the "influencers" variable array and filters it with the "top_amount" method in the "filterByMethod" service.
    // The "influencersMostInfluent" receives the "influencers" variable value, sorts it by "Engagement" from the most to least influent, and after that is filtered by the top 6 most influent.
    // The "influencersLeastInfluent" receives the "influencers" variable value, sorts it by "Engagement" from the least to most influent, and after that is filtered by the top 2 most influent.

    this.http.get('http://localhost:8080/influencers').subscribe((x: ServerResponse) => {
      this.influencers = this.sortByMethod.sortBy(x.records, 'Followers', 'desc')
      this.influencersTopTen = this.filterByMethod.filterBy(this.influencers, 'top_amount', 10)
      this.influencersMostInfluent = this.filterByMethod.filterBy(this.sortByMethod.sortBy(this.influencers, 'Engagement', 'desc'), 'top_amount', 6)
      this.influencersLeastInfluent = this.filterByMethod.filterBy(this.sortByMethod.sortBy(this.influencers, 'Engagement', 'asc'), 'top_amount', 2)
    })
  }

}
