import { Injectable } from '@angular/core';

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

@Injectable({
  providedIn: 'root'
})
export class FilterByService {


  constructor() { }

  filterByKeywords(influencers: Influencer[], filterArray: (string)[]){
    if(!filterArray[0]) return influencers
    return influencers.filter((influencer: Influencer) => filterArray.filter(filter => influencer.biography.includes(filter))[0] ? true : false)
  }

  filterByFollower(influencers: Influencer[], filterProp: number){
    return influencers.filter((influencer: Influencer) => filterProp <= influencer.followerCount)
  }

  filterByInterests(influencers: Influencer[], filterArray: (string)[]){
    if(!filterArray[0]) return influencers
    return influencers.filter((influencer: Influencer) => {
      return filterArray.filter((filterString: string) => {
        return influencer.stats.interests.filter((interests) => interests == filterString)[0] ? true : false
      })[0] ? true : false
    })
  }

  filterBy(influencers: Influencer[], filterType: string, filterProp: (number|(string|number)[])){
    return this['filterBy'+filterType](influencers, filterProp)
  }

  filterByTopAmount(influencers: Influencer[], filterProp: number){
    return influencers.slice(0, filterProp)
  }

  getEngagementLevels(engagement: Engagement, followers: number){
    return (engagement.avgLikesRatio + engagement.avgCommentsRatio)*followers
  }

}
