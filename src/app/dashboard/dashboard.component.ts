import { Component, OnInit } from '@angular/core';
import { SortByService } from '../sort-by.service'
import { FilterByService } from '../filter-by.service'
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

  influencers: Influencer[]
  influencersTopTen: Influencer[] = []
  influencersMostInfluent: Influencer[] = []
  influencersLeastInfluent: Influencer[] = []
  interests: (string|number)[]
  
  constructor(
    private filterByMethod: FilterByService,
    private sortByMethod: SortByService,
    private http: HttpClient
  ) {

  }

  ngOnInit() {
    this.http.get('http://localhost:8080/influencers').subscribe((x: ServerResponse) => {
      this.influencers = x.records
      this.influencersTopTen = this.filterByMethod.filterBy(this.influencers, 'TopAmount', 10)
      this.influencersMostInfluent = this.filterByMethod.filterBy(this.sortByMethod.sortBy(this.influencers, 'Engagement', 'desc'), 'TopAmount', 6)
      this.influencersLeastInfluent = this.filterByMethod.filterBy(this.sortByMethod.sortBy(this.influencers, 'Engagement', 'asc'), 'TopAmount', 2)
      this.interests = _.uniq(this.influencers.flatMap((influencer: Influencer) => influencer.stats.interests))
    })
  }

}
