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
    // Checks if the array of filters is empty, and if it is, returns the influencers without any filtering
    if(!filterArray[0]) return influencers

    // Filters the influencers to check if it matches with any of the strings in "filterArray", and returns the array values
    return influencers.filter((influencer: Influencer) => {

      // Filters the "filterArray" to get the strings inside the "filterArray" array to make the comparison
      return filterArray.filter(filter => {

        //Checks if any of the influencer keywords in biography are included in any of the "filterArray" strings, and returns true or false from this comparison
        return influencer.biography.includes(filter)
      })[0] ? true : false
    })
  }

  filterByFollower(influencers: Influencer[], filterProp: number){
    //Filters the "influencers" to check if the number of followers of the influencer is bigger than the "filterProp" number and returns the filtered array
    return influencers.filter((influencer: Influencer) => filterProp <= influencer.followerCount)
  }

  filterByInterests(influencers: Influencer[], filterArray: (string)[]){
    // Checks if the array of filters is empty, and if it is, returns the influencers without any filtering
    if(!filterArray[0]) return influencers

    // Filters the influencers to check if it matches with any of the strings in "filterArray", and returns the array values
    return influencers.filter((influencer: Influencer) => {

      // Filters the "filterArray" to check if any of the influencer interests match with any of the "filterArray" strings, and returns true or false from this comparison
      return filterArray.filter((filterString: string) => {

        // Filters the "influencer" interests to check if any of the interests match with any of the "filterArray" strings, and returns true or false from this comparison
        return influencer.stats.interests.filter((interests) => interests == filterString)[0] ? true : false
      })[0] ? true : false
    })
  }

  filterBy(influencers: Influencer[], filterMethod: string, filterProp: (number|(string|number)[])){
    //Receives three arguments, the first being the array of influencers, second being the string method to filter by and the third being the properties which will filter the influencers array.
    //Then, uses the "filterMethod" string to choose the method used to filter the array of influencers and after that, it set's the array of influencers and the
    //properties passed in the second argument as arguments of the defined method. After that, it get's the return from the "filterMethod" method and returns the value to the function that executed this method.
    return this['filterBy'+filterMethod](influencers, filterProp)
  }

  filterByTopAmount(influencers: Influencer[], filterProp: number){
    //Filter the "influencers" array by it`s size, via "filterProp" number and returns the result
    return influencers.slice(0, filterProp)
  }

  getEngagementLevels(engagement: Engagement, followers: number){
    //Calculates the engagement level and returns it
    return (engagement.avgLikesRatio + engagement.avgCommentsRatio)*followers
  }

}
