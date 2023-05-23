import Season from '@components/season/Season';
import Seasons from '@components/season/Seasons';
import Tournaments from '@components/tournament/Tournaments';
import { SeasonService, SeasonsService } from '@utils/api-service';

const seasonLoader = async ({ params: { id } }) => {
  let data;
  console.log('season loader');
  if (!id) {
    data = await SeasonService.getCurrent();
  } else {
    data = await SeasonService.get(id);
  }
  return data || null;
};

const seasonsLoader = async () => {
  let data;
  console.log('seasons loader');
  data = await SeasonsService.getAllSeasons(); 
  return data || null;
};

export default [
  {
    path: '/seasons',
    element: <Seasons />,
    loader: seasonsLoader,
  },
  {
    path: '/seasons/:id',
    element: <Season />,
    loader: seasonLoader,
  },
  {
    path: '/seasons/:id/tournaments',
    element: <Tournaments />,
    loader: async ({ params }) => {
      return (await SeasonService.getTournaments(params.id)) || null;
    },
  },
  // {
  //   path: '/season',
  //   element: <Season />,
  //   loader: seasonLoader,
  //   children: [
  //     {
  //       path: '/season/:id',
  //       element: <Season />,
  //       loader: seasonLoader,
  //       children: [
  //         {
  //           path: '/season/:id/tournaments',
  //           element: <Tournaments />,
  //           loader: async ({ params }) => {
  //             console.log('touranment loader');
  //             return await SeasonService.getTournaments(params.id);
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
];
