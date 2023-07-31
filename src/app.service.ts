import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import axios from 'axios';

@Injectable()
export class AppService {
  async getFourSquareDataFromPostCode(postcode: string, res: Response) {
    const response = await axios.get(
      `https://api.postcodes.io/postcodes/${postcode}`,
    );
    const { latitude, longitude } = response.data.result;
    const foursquarePlaces = await axios.get(
      `https://api.foursquare.com/v3/places/search?ll=${
        latitude.toString() + ',' + longitude.toString()
      }`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: process.env.API_KEY,
        },
      },
    );

    const locationData = foursquarePlaces.data.results.map((el) => {
      return {
        name: el.name,
        fsqId: el.fsq_id,
        imageUrl:
          el.categories?.[0]?.icon?.prefix + el.categories?.[0]?.icon?.suffix,
        latitude: el.geocodes.main.latitude,
        longitude: el.geocodes.main.longitude,
        distance: el.distance,
      };
    });

    // initializing the CSV string content with the headers
    let csvData =
      ['name', 'FSQ ID', 'Image URL', 'Latitude', 'Longitude', 'Distance'].join(
        ',',
      ) + '\r\n';
    locationData.forEach((location) => {
      // populating the CSV content
      // and converting the null fields to ""
      csvData +=
        [
          location.name,
          location.fsqId,
          location.imageUrl,
          location.latitude,
          location.longitude,
          location.distance,
        ].join(',') + '\r\n';
    });

    // returning the CSV content via the "locations.csv" file
    res
      .set({
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="locations.csv"`,
      })
      .send(csvData);
  }
}
