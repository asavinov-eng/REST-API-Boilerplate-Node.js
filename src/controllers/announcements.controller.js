import prisma from '../../prisma/client.js'

const PER_PAGE = 10

export async function getAnnouncements(req, res) {
  const { search = '', sort, page = '1' } = req.query
  const pageNumber = Number(page) || 1

  const where = {}
  const normalizedSearch = String(search).trim()
  if (normalizedSearch) {
    where.title = {
      contains: normalizedSearch,
      mode: 'insensitive',
    }
  }

  const orderBy = {
    createdAt: sort === 'oldest' ? 'asc' : 'desc',
  }

  const [data, total] = await Promise.all([
    prisma.announcement.findMany({
      where,
      orderBy,
      skip: (pageNumber - 1) * PER_PAGE,
      take: PER_PAGE,
    }),
    prisma.announcement.count({ where }),
  ])

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE))

  res.json({
    data,
    pagination: {
      total,
      page: pageNumber,
      totalPages,
      perPage: PER_PAGE,
    },
  })
}

export async function getAnnouncementById(req, res) {
  const id = Number(req.params.id)
  const announcement = await prisma.announcement.findUniqueOrThrow({
    where: { id },
  })

  res.json(announcement)
}

export async function createAnnouncement(req, res) {
  const announcement = await prisma.announcement.create({
    data: req.body,
  })

  res.status(201).json(announcement)
}

export async function updateAnnouncement(req, res) {
  const id = Number(req.params.id)
  const announcement = await prisma.announcement.update({
    where: { id },
    data: req.body,
  })

  res.json(announcement)
}

export async function deleteAnnouncement(req, res) {
  const id = Number(req.params.id)
  await prisma.announcement.delete({
    where: { id },
  })

  res.status(204).end()
}
