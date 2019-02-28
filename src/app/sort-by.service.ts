import { Injectable } from '@angular/core';

interface Influencer {
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

@Injectable({
  providedIn: 'root'
})
export class SortByService {

  sortByFollowers(array: Influencer[], order){
    return array.sort((a: Influencer, b: Influencer) => {
      const ascOrDesc = {
        asc: a.followerCount - b.followerCount,
        desc: b.followerCount - a.followerCount
      }
      return ascOrDesc[order]
    })
  }

  getEngagementLevels(engagement: Engagement, followers: number){
    return (engagement.avgLikesRatio + engagement.avgCommentsRatio)*followers
  }

  sortByEngagement(array: Influencer[], order){
    return array.sort((a: Influencer, b: Influencer) => {
      const ascOrDesc = {
        asc: this.getEngagementLevels(a.stats.engagement, a.followerCount) - this.getEngagementLevels(b.stats.engagement, b.followerCount),
        desc: this.getEngagementLevels(b.stats.engagement, b.followerCount) - this.getEngagementLevels(a.stats.engagement, a.followerCount)
      }
      return ascOrDesc[order]
    })
  }

  sortBy(array: Influencer[], sortable: string, order: string){
    return this['sortBy'+sortable](array, order)

  }

  constructor() { }
}
