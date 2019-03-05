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
export class SortByService {

  sortByFollowers(array: Influencer[], order){
    // Receives two arguments, the first being the array that will be sorted, and the order that the array received will be sorted.
    // It returns the array sorted with the sort method
    return array.sort((a: Influencer, b: Influencer) => {

      // ascOrDesc is a constant with a object that has two keys, "asc" and "desc".
      // Both, gets the arguments passed by the lambda function and uses them to sort the array by it's followers.
      // Depending on the keyname, it value will be ascendent or descendent.
      const ascOrDesc = {
        asc: a.followerCount - b.followerCount,
        desc: b.followerCount - a.followerCount
      }

      //returns the value based on the order string passed via argument to this method
      return ascOrDesc[order]
    })
  }

  getEngagementLevels(engagement: Engagement, followers: number){
    // Gets the "Engagement" object and calculates the engagement with simple math.
    // Returns the engagement levels calculated.
    return (engagement.avgLikesRatio + engagement.avgCommentsRatio)*followers
  }

  sortByEngagement(array: Influencer[], order){
    // Receives two arguments, the first being the array that will be sorted, and the order that the array received will be sorted.
    // It returns the array sorted with the sort method
    return array.sort((a: Influencer, b: Influencer) => {

      // ascOrDesc is a constant with a object that has two keys, "asc" and "desc".
      // Both, gets the arguments passed by the lambda function and puts them in the "getEngagementLevels" method.
      // Depending on the keyname, it value will be ascendent or descendent.
      const ascOrDesc = {
        asc: this.getEngagementLevels(a.stats.engagement, a.followerCount) - this.getEngagementLevels(b.stats.engagement, b.followerCount),
        desc: this.getEngagementLevels(b.stats.engagement, b.followerCount) - this.getEngagementLevels(a.stats.engagement, a.followerCount)
      }

      //returns the value based on the order string passed via argument to this method
      return ascOrDesc[order]
    })
  }

  sortBy(array: Influencer[], sortMethod: string, order: string){
    //Receives three arguments, the first being the array of influencers, second being the string method to sort by and the third being the order which it will be sorted
    //Then, uses the "sortMethod" string to choose the method used to sort the array of influencers and after that, it get's the array passed in the first argument, and the
    //order passed in the second argument. After that, it get's the return from the "sortMethod" method and returns the value to the function that executed this function.
    return this['sortBy'+sortMethod](array, order)

  }

  constructor() { }
}
