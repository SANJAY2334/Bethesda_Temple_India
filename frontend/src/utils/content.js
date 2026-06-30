import {
HeartHandshake,
Mic2,
Music2,
Sparkles,
UsersRound,
BookOpen,
UserRound,
} from 'lucide-react'
import { images } from './images.js'

export const ministries = [
{
title: 'Youth Ministry',
icon: Sparkles,
summary:
'Mentoring young people into resilient faith through discipleship, fellowship, worship, and service.',
},
{
title: 'Village Outreach Ministry',
icon: HeartHandshake,
summary:
'Sharing God’s love through evangelism, community support, outreach programs, and compassionate service in surrounding villages.',
},
{
title: 'Sunday School',
icon: BookOpen,
summary:
'Providing engaging biblical education and spiritual formation for children in a safe and nurturing environment.',
},
{
title: "Women's & Men's Ministry",
icon: UserRound,
summary:
'Encouraging spiritual growth, fellowship, mentoring, prayer, and mutual support among men and women.',
},
]

export const sermons = [
{
title: 'Still Waters for a Restless Heart',
speaker: 'Pastor Daniel Mathew',
date: '2026-05-17',
passage: 'Psalm 23',
image: images.prayer,
},
{
title: 'A House Filled With Mercy',
speaker: 'Pastor Miriam John',
date: '2026-05-10',
passage: 'Luke 15',
image: images.interior,
},
{
title: 'Faith That Welcomes the City',
speaker: 'Pastor Daniel Mathew',
date: '2026-05-03',
passage: 'Matthew 5:14-16',
image: images.community,
},
]

export const events = [
{
title: 'Sunday Worship Gathering',
date: '2026-05-24T09:30:00+05:30',
location: 'Main Sanctuary',
image: images.worshipHall,
},
{
title: 'Village Outreach Program',
date: '2026-06-06T08:00:00+05:30',
location: 'Community Outreach Center',
image: images.volunteers,
},
{
title: 'Night of Worship and Prayer',
date: '2026-06-12T18:30:00+05:30',
location: 'Prayer Chapel',
image: images.choir,
},
]

export const quotes = [
'Peace I leave with you; my peace I give to you.',
'The Lord is my shepherd; I shall not want.',
'Let the word of Christ dwell in you richly.',
]

export const adminModules = [
{ label: 'Manage Sermons', to: '/admin/sermons', stat: '42', icon: Mic2 },
{ label: 'Manage Events', to: '/admin/events', stat: '11', icon: Sparkles },
{ label: 'Gallery Assets', to: '/admin/gallery', stat: '128', icon: UsersRound },
{ label: 'Prayer Requests', to: '/admin/prayer-requests', stat: '24', icon: HeartHandshake },
]
