import { fetchGraphql } from './api/github';
import {
  userDetails,
  week,
  contributionCount,
  queryOption,
} from './interfaces/interface';
import { Card } from './GraphCards';

//GraphQl query to get everyday contributions as a response
export const generateGraphqlQuery = (username: string) => {
  return {
    query: `
      query userInfo($LOGIN: String!) {
       user(login: $LOGIN) {
         name
         contributionsCollection {
           contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                }
              }
            }
          }
        }
      },
    `,
    variables: {
      LOGIN: username,
    },
  };
};

export const fetchContributions = async (username: string) => {
  try {
    const response = await fetchGraphql(generateGraphqlQuery(username));
    if (response.data.data.user === null) {
      return "Can't fetch any contribution. Please check your username 😬";
    } else {
      const userData: userDetails = {
        contributions: [],
        name: response.data.data.user.name,
      };
      //filtering the week data from API response
      const weeks: week[] =
        response.data.data.user.contributionsCollection.contributionCalendar
          .weeks;
      //slicing last 6 weeks
      weeks.slice(weeks.length - 6, weeks.length).map((week: week) =>
        week.contributionDays.map((contributionCount: contributionCount) => {
          userData.contributions.push(contributionCount.contributionCount);
        })
      );

      //returning data of last 31 days
      const presentDay = new Date().getDay();
      userData.contributions = userData.contributions.slice(
        5 + presentDay,
        36 + presentDay
      );
      return userData;
    }
  } catch (error) {
    return error;
  }
};

export const main = async () => {
  const options: queryOption = {
    username: 'zhanyeye',
    hide_title: false,
    colors: {
      areaColor: '9e4c98',
      bgColor: 'fffff0',
      borderColor: '0000',
      color: '708090',
      lineColor: '9e4c98',
      pointColor: '24292e',
    },
    area: true,
  };

  const fetchCalendarData: userDetails = await fetchContributions(
    `${options.username}`
  );

  if (typeof fetchCalendarData === 'object') {
    let title = '';

    if (!options.hide_title) {
      if (options.custom_title) {
        title = options.custom_title;
      } else {
        title = `${
          fetchCalendarData.name !== null
            ? fetchCalendarData.name
            : options.username
        }'s Contribution Graph`;
      }
    }

    const graph: Card = new Card(
      360,
      1200,
      options.colors,
      title,
      options.area
    );

    const getChart: string = await graph.chart(fetchCalendarData.contributions);
    return getChart;
  }
};
