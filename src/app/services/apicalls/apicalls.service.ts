import { Injectable } from '@angular/core';
import axios from 'axios';
import { ApiResponse } from '../../pojo/ResponseModels/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class ApicallsService {

  constructor() { }

  public async fetchLocalApiData(url: string) {
    let apiResponse: ApiResponse;
    const uri = url;
    try {
      apiResponse = await axios.get(uri)
        .then((response) => {
          if (response.status == 200) {
            const result: ApiResponse = new ApiResponse();
            result.status = 0;
            result.data = response.data;
            result.message = "Success";
            return result;
          } else {
            const result: ApiResponse = new ApiResponse();
            result.status = 1;
            result.message = "Please try again";
            return result;
          }
        }, (error) => {
          const result: ApiResponse = new ApiResponse();
          result.status = 2;
          result.message = "Please try later";
          return result;
        });
    } catch (error) {
      const result: ApiResponse = new ApiResponse();
      result.status = 3;
      result.message = "Please try again";
      apiResponse = result;
    } finally {
      return apiResponse;
    }
  }

}
