import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '~/config/Prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(500).json('INVALID REQUEST METHOD');

  const { search, cursor } = req.query;

  const limit = 10;
  const cursorObj = cursor === '' ? undefined : { id: (cursor as string) ?? '' };

  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search as string,
          },
        },
        {
          username: {
            contains: search as string,
          },
        },
      ],
    },
    select: {
      id: true,
      profile_photo: true,
      cover_photo: true,
      name: true,
      username: true,
    },
    orderBy: {
      name: 'asc',
    },
    take: limit,
    cursor: cursorObj,
    skip: cursor === '' ? 0 : 1,
  });

  res.status(200).json({
    users,
    nextId: users.length === limit ? users[limit - 1].id : undefined,
  });
}
