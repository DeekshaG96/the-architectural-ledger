import { Employee, Department, Activity } from './types';

export const EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'Ethan Caldwell',
    email: 'e.caldwell@ledger.ems',
    role: 'Senior Architect',
    department: 'Engineering',
    status: 'Active',
    joinDate: 'Oct 12, 2021',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaD3LAH1-Jbq44fLonmnpFThd52Tg07POOmL1k375624eqGPOdkaPsUHdV7hkrMxikp3USE8pkuIB-ZZAwF3jyEUyCbH-Woa6FRluqquhH5tqAa-fqtnWcurIZ3SfpVKVUCcfFrjTvqV-6oYdKz3KyJAH6bLR9Jm9JnATUHP1gXF_8RhRg-eC_rd-eUDzLuKgrL1apYqXp3cfztPRsKNRy_fDpug8TBTHC5Ododc_L_bqYlRA00AHz9HBiPOmCUC1e9qVT_962QXU4',
    performance: 9.8,
    salary: '£142,500',
    phone: '+44 20 7946 0124',
    location: 'London Headquarters • Floor 12',
    manager: 'Marcus Thorne',
    managerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVcgZmHOCHZn8Ly1j9zp-ab6231iyAOOZlqw6FVmObXhPcVZ7O29c6ppe1GRj03kSgEmsqA8EKFYx5l4FDOMLUximGdDwm2LvOY69wis43z8YfDefeZRwYCVRFfPcuAGf2xFJhRcoAp3v8xtTdb9rGXvoRIlwiWAytIWQf0Ru6_Ws-tTEsurZfOob5qa1UtogmtGb1D-9hxkOxdiLFvKbgthe9H2nA7KmH5Hzgp80NotAWNET3nc7a-EtWl5VaEmgqn9dfId0hvAKS',
    competencies: ['BIM Modeling', 'Structural Analysis', 'LEED Platinum Design', 'Sustainable Materials', 'Urban Planning', 'Project Management', 'Parametric Design']
  },
  {
    id: '2',
    name: 'Sana Al-Farsi',
    email: 's.farsi@ledger.ems',
    role: 'Product Designer',
    department: 'Creative Ops',
    status: 'On Leave',
    joinDate: 'Jan 05, 2023',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfiGPzrSdUPud9TJf9cmILx6mhXGGFft6pQyR0bfCKbaiAI7Q00xBk4yglpnCG5s0rLoEB1GIf9WBo6NyvTaC7qYLKJILebTfMW0GB6WEYfGaS0wnq7CEvg6TGns-W78JzX6QMB9V5XtYrmOc4OMo-444q3KmZOdqalUsECVMmd8ZqTBHY4UKpONr8YqTE68X_bZo-00cIQn1ZxIQ8iWvf-l1Fb_iy6UM23JZT3v7oW7vl8V-fDchUQ0zqapF5EmAjqRbbHM8CYkau'
  },
  {
    id: '3',
    name: 'Marcus Vane',
    email: 'm.vane@ledger.ems',
    role: 'Operations Lead',
    department: 'Logistics',
    status: 'Active',
    joinDate: 'Mar 22, 2020',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDseIZRiLtKMpu4f9584jTud1BRPO8HDLizs8Oh6Xx9Ve7o7NlpGMgHKlATiAP60ZZkNB88jGDMyich1tza2L7iVCh7ERLOoK9lPeT2ejeAiNtSFLaXspAcgr07e652ewoDCtQH_farpQEs63EU4dQ79LQ_Nj1t110tjSdocih2GknnQWmEXnygmGsol-ywAqx8tV9NzgCu150kgNC50RrAxGthGH7dou4VqAeYNWWes_rVwBSRwky6Yo-azgva0Q7ELIwiFJUe9Tvh'
  },
  {
    id: '4',
    name: 'Elena Rodriguez',
    email: 'e.rod@ledger.ems',
    role: 'HR Manager',
    department: 'Human Resources',
    status: 'Active',
    joinDate: 'Jun 15, 2019',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiRINfEIZJluaCbiufMsQVUZZpAYNLg7o18nggfoET6qcSHj5qXSFMLHQsAkHCEiPH36KWmLGwhVRQGrEjv66f3LJejA-eZ8iUy7Jf3X6oDIry0o1eZLD-HZYD3rC2M5toKfZmHCiX505jIMxANP3zQV3JrwEwpxbkA0RT3ct77yEpx4Ma_fiRJHcYFaC24TH2fSFSJj4nlhlTYNWPzXDW_JbXCxLJT1wvcUOw7AxVNL3ewYCf_AxxNNqkPJ4aoQMSy05wsUdn3DUa'
  }
];

export const DEPARTMENTS: Department[] = [
  {
    id: '1',
    name: 'Engineering',
    description: 'Software Development & DevOps',
    manager: 'Marcus Thorne',
    managerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbkFOF_Hzu3QAglquc09Oy43hUdjx67IYI2saerU1qW_yNl_HURoTxBmbZjKp2WdVgCsxZmpNvQ4XeOt5wl84yl1EbKVPZRN3kbRp4La4gPEYiK42tRqnp4-TXuXXwwEH8YBw9FfPK-KXbGTinZqKXtnjtypMWiAC21OxVYUUBdZcVLJo9rjiGrveZkybTJX8kiDPoxhlNN_UBj0qDHqVn6_Lg-9-1cvSHAuB-K1FuKk431YtMGjv8Qd4KdfjhFy6BeAiXhpoCz0lG',
    workforce: 42,
    icon: 'code',
    color: 'primary'
  },
  {
    id: '2',
    name: 'Marketing',
    description: 'Growth & Brand Identity',
    manager: 'Elena Rodriguez',
    managerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjgxS2-EGQivhle5NY3SotpToEanf8yntnh02kSQgyJxJ4vdPClTGj0VBX48mR9eW2M77rSuVlcGNSjXZiHPxnUSlvz8Tvn7EdBmf2nCI9nzVAWFhvln0rLyuSCnXHxzS0giNj3Cadkkybh-SWd_BR7SFtJOxSS18ENct13YFGUhyeu7Z1oI1LHSNhATWuLXZzIqBPyqH98JdUUMIeeNzmd7fkAvAZ2UNmDFq9NhgrMX8_IyyGZ1A0ocTnOAPyVv9Fhxj51zNB4n9A',
    workforce: 18,
    icon: 'megaphone',
    color: 'tertiary'
  },
  {
    id: '3',
    name: 'Finance',
    description: 'Payroll & Strategic Planning',
    manager: 'Jameson Chen',
    managerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLJiAxwLtAa3Vc07Mggy3mOpuF37I58wbH_N6rABKhqgVVN--c9GPvUswyLaY7Vgs4XSvByUca_8PtrnELdQAEoBCBDoIqnZB9ir2dMOOEYWNWT-7VIi7O8_S_NtUc4s5jYPzIPG6y0VBAGGdQdedOU9zY5Ilosi0OsGf6NaCLthboIkerL8j54zXwpPhquQAx78iyUs3TfBkK061H2IDDDqncH5PbrlBuCO9t5wEedXWK1nRMYNOFiYDjFSkc8FB9SuxCxJPr8ekp',
    workforce: 12,
    icon: 'bank',
    color: 'secondary'
  },
  {
    id: '4',
    name: 'Operations',
    description: 'Logistics & Infrastructure',
    manager: 'Sarah Jenkins',
    managerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlB47urTWseXKziOWTFfUkIt3wNx_JOVOc-1Q7PB77DvXEON4Wzzi0VyKv_LJD25_2iuQm_pohwdzSwdKzP7MdqRuql_W1TH66P0H8kc_bFV4lbcZ6oqtgHVZQx5mBSCiq5pZ-9yfV973MDyeKgpG1NkUzGEH648FlaRp76lOFHwvb0-rM4maZ7Br85z6QZ4lQBR1IsMVTnaZhacsriR7l-OgzPWjw9X50RdLUfLpvTIlVUaNP_FZ0eorbgHkut0LSXttq12Yha2Xq',
    workforce: 25,
    icon: 'settings',
    color: 'surface-variant'
  },
  {
    id: '5',
    name: 'Human Resources',
    description: 'Talent & Culture',
    manager: 'David Wu',
    managerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhm7_Uz_TrXRLPePiM87UeHjbCg-5DMb0cNu5YoxKu0nfCfmCLWRZ7WFjM87RLDDbmBBEivpX2OxBF9yCJpuLYJerXTxyKpZwHKLhVsqN-MHpzEDem0z8HBxwSkQNxvFVDhd4avc2o9spBG2CLJSNgggEj5FrN4NKHqxsQFMtW8HgsH0edAX_mUu2DbTStO9VlnfgomX9Rx37dgcpOPVLXRGdjyBBGAT0VH8-yCxcAyjCoEv1R8e9_H65_MqcbYh-ynMB9DE-CcMKD',
    workforce: 8,
    icon: 'users',
    color: 'primary-fixed-dim'
  }
];

export const ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: 'Sarah Jenkins',
    description: 'New hire joined Engineering',
    timestamp: '2 MINUTES AGO',
    type: 'Registration',
    userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfF1J3NmkVzACyk8W5OfFsRQ8kFhjmgsRjRDGBgkF7Q5WeXXDoWcav_cc8xLi0hy-qt0xr1CDWAO6WNT354oqq6YKooXpW0rJTEEWXme_ov9_1PKk-q-CuknKQQsICsnmUcGXHGPb3BjZbewBhxQAxJWN-wlA3DTMcHIVvUaNJBSXF57WyMVZhn8ciDPk8lZDqs7z5Erj4AD4sf2Bd_FMpxY6mqUT-XkswQzBNX-AX_fhrq5Q11VFIuxchKTeqmEFeLDfCqxwtIRKr'
  },
  {
    id: '2',
    title: 'Payroll Ledger Closure',
    description: 'Monthly disbursements authorized by M. Thorne',
    timestamp: '45 MINUTES AGO',
    type: 'Financial',
    icon: 'banknote'
  },
  {
    id: '3',
    title: 'David Chen',
    description: 'Promoted to Senior Product Manager',
    timestamp: '3 HOURS AGO',
    type: 'Promotion',
    userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCshLFT6GIXUhfXcDs7SZAPh-IVJ5BK16PFG3pkBkxzVbEBKImyl1y2ksDewnXunqlUUBKIymvPPrV-wtBFWoyCZNL_FtfYmNs612wNt48gh-PCsC2sciRLbGEvllO8TcgtpvYCgv_bZ5-S6DPI64_47tRNk9h84MbYmvP5eXDORGx-D7qK545M7OkRCF0qvzNnVEAG9TQh10FLOYiv-xbsLkk2wqL_kz_SI02Kw8qysqWmokko84g8VmqhonnGsYuQ51GCQejU38Qj'
  },
  {
    id: '4',
    title: 'Marketing Restructure',
    description: 'Departmental hierarchy updated (4 branches affected)',
    timestamp: 'YESTERDAY',
    type: 'Structural',
    icon: 'layout'
  },
  {
    id: '5',
    title: 'Elena Rodriguez',
    description: 'Certification updated: Agile Mastery',
    timestamp: 'YESTERDAY',
    type: 'Credential',
    userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEsTY7SWYMpGgSqwJ1q4g3RiqrgSmBaC_ptiNs7tZYWOmrVqGpniMAsb-6IQNMoy4svz_GO3GNQs9yCZVoOgpVAAvWKuofeODJZuYvFtCkQQV9CpV38xDhaWAogAiLcjG2YG612gGDO91azQv3CBjCiuj8yeieTXYggC9BuPbkhZqgfNpmgEe2H4xHY26P0wonbajxyvGM9_CWjlzJffE8prDEPiuXP3KIDOIWf6mM0D4tUOBciCdbObistNQ9uHgtP-KtL8TQVUhE'
  }
];
