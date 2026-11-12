export interface ChurchConfig {
  name: string;
  tagline: string;
  location: {
    area: string;
    city: string;
    state: string;
    country: string;
    fullAddress: string;
    pincode: string;
    mapsEmbedUrl: string;
    googleMapsDirectionsUrl: string;
  };
  contact: {
    phone: string;
    email: string;
    whatsappNumber: string;
    whatsappMessage: string;
  };
  services: {
    sunday: {
      name: string;
      day: string;
      time: string;
      activities: string[];
      description: string;
    };
    friday: {
      name: string;
      day: string;
      time: string;
      activities: string[];
      description: string;
    };
    welcomeNote: string;
  };
  onlinePrayer: {
    heading: string;
    description: string;
    schedule: string;
    platform: string;
    meetingLink: string;
    fallbackMessage: string;
  };
  scripture: {
    verse: string;
    reference: string;
  };
  social: {
    facebook: string;
    instagram: string;
    youtube: string;
    whatsapp: string;
  };
  historyTimeline: Array<{
    year: string;
    title: string;
    description: string;
    category: string;
    image: string;
  }>;
  leadership: Array<{
    id: string;
    name: string;
    designation: string;
    image: string;
    bio: string;
    bookletNote?: string;
  }>;
  worshipTeam: {
    heading: string;
    description: string;
    image: string;
    features: string[];
  };
  beliefs: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  galleryCategories: string[];
  galleryItems: Array<{
    id: string;
    title: string;
    category: string;
    imageUrl: string;
    caption: string;
  }>;
  events: Array<{
    id: string;
    title: string;
    date: string;
    time: string;
    description: string;
    location: string;
    image: string;
    tag: string;
  }>;
}

export const initialChurchConfig: ChurchConfig = {
  name: "Mighty Nation Church",
  tagline: "Worship • Grow in Faith • Be Transformed",
  location: {
    area: "East Wadala",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    fullAddress: "Rajeev Gandhi Nagar, Salt Pan Road, Azad Mohalla, East Wadala, Mumbai – 400037",
    pincode: "400037",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15083.568165691136!2d72.8601614!3d19.0222479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf3725b74683%3A0xe54b9d0315cf29ff!2sSalt%20Pan%20Rd%2C%20East%20Wadala%2C%20Wadala%2C%20Mumbai%2C%20Maharashtra%20400037!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    googleMapsDirectionsUrl: "https://maps.google.com/?q=Salt+Pan+Road+East+Wadala+Mumbai+400037"
  },
  contact: {
    phone: "[TO BE UPDATED]",
    email: "[TO BE UPDATED]",
    whatsappNumber: "",
    whatsappMessage: "Praise the Lord! I would like to connect with Mighty Nation Church."
  },
  services: {
    sunday: {
      name: "Sunday Worship Service",
      day: "Every Sunday",
      time: "12:00 PM – 2:00 PM",
      activities: [
        "Praise & Worship",
        "Bible Teaching",
        "Prayer & Ministry",
        "Fellowship"
      ],
      description: "Come together for joyful worship, inspiring Scripture teaching, and warm fellowship."
    },
    friday: {
      name: "Friday Fasting Prayer",
      day: "Every Friday",
      time: "8:30 PM – 9:30 PM",
      activities: [
        "Fasting Prayer",
        "Intercession",
        "Healing & Breakthrough"
      ],
      description: "An evening of dedicated prayer standing in the gap for families and personal needs."
    },
    welcomeNote: "Everyone is warmly welcome to worship with us."
  },
  onlinePrayer: {
    heading: "Daily Online Prayer",
    description: "Stay connected in prayer wherever you are.",
    schedule: "[TIME TO BE UPDATED]",
    platform: "[GOOGLE MEET / ZOOM / WHATSAPP]",
    meetingLink: "",
    fallbackMessage: "Contact us to receive the daily online prayer meeting details."
  },
  scripture: {
    verse: "I can do all things through Christ who strengthens me.",
    reference: "Philippians 4:13"
  },
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
    whatsapp: ""
  },
  historyTimeline: [
    {
      year: "1985",
      title: "Friendship Centre India Began",
      description: "Friendship Centre India ministry began in Mumbai under Pastor John & Priscilla Gladstone to serve the community.",
      category: "Ministry Initiative",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
    },
    {
      year: "1991",
      title: "Priscilla Children's Home Established",
      description: "Established to support children and families in need with Christian care.",
      category: "Compassion Outreach",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80"
    },
    {
      year: "2013",
      title: "Mighty Nation Bible College Established",
      description: "Founded to provide sound biblical education, spiritual training, and leadership development.",
      category: "Biblical Education",
      image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=800&q=80"
    }
  ],
  leadership: [
    {
      id: "john-gladstone",
      name: "Pastor John Gladstone",
      designation: "Founder & President of Friendship Centre India",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      bio: "Founder and President of Friendship Centre India, dedicated to the Gospel and raising strong leaders.",
      bookletNote: "Founder & President of Friendship Centre India."
    },
    {
      id: "priscilla-gladstone",
      name: "Priscilla Gladstone",
      designation: "Co-Founder / Ministry Leader",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      bio: "Co-founder associated with Friendship Centre India and the establishment of Priscilla Children's Home.",
      bookletNote: "Associated with FCI and Priscilla Children's Home."
    },
    {
      id: "pastor-mukesh",
      name: "Pastor Mukesh",
      designation: "Pastor",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
      bio: "Shepherding Mighty Nation Church with faithful biblical teaching and pastoral care in Wadala.",
      bookletNote: "Pastor of Mighty Nation Church."
    },
    {
      id: "sister-sangeeta",
      name: "Sister Sangeeta Aunty",
      designation: "Ministry Leader / Church Ministry Team",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
      bio: "Serving with the church ministry team, encouraging prayer and spiritual support for families.",
      bookletNote: "Church Ministry Team leader."
    }
  ],
  worshipTeam: {
    heading: "United in Worship",
    description: "Our worship ministry brings people together through praise, music, prayer, and worship, creating an atmosphere to glorify God.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Christ-Centered Praise & Music",
      "Worship Gatherings",
      "Special Praise Vigils"
    ]
  },
  beliefs: [
    {
      title: "Faith in Jesus Christ",
      description: "We believe in Jesus Christ as our Lord and Savior, whose grace offers eternal life to all.",
      icon: "Cross"
    },
    {
      title: "The Holy Bible",
      description: "We uphold the Holy Scriptures as the inspired and unchanging Word of God.",
      icon: "BookOpen"
    },
    {
      title: "Prayer and Worship",
      description: "We prioritize heartfelt worship and persistent prayer in God's presence.",
      icon: "Flame"
    },
    {
      title: "Love and Forgiveness",
      description: "We live by Christ's love, extending kindness, grace, and reconciliation.",
      icon: "Heart"
    },
    {
      title: "Spiritual Growth",
      description: "We encourage continual growth in biblical understanding and character.",
      icon: "TrendingUp"
    },
    {
      title: "Serving Others",
      description: "We follow Jesus' example by serving our community with compassion.",
      icon: "Users"
    }
  ],
  galleryCategories: [
    "All",
    "Church Building",
    "Sunday Worship",
    "Friday Fasting Prayer",
    "Worship Team",
    "Church Family",
    "Church Events",
    "Special Programs",
    "Prayer Meetings"
  ],
  galleryItems: [
    {
      id: "gal-1",
      title: "Sunday Joyful Praise",
      category: "Sunday Worship",
      imageUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=900&q=80",
      caption: "Heartfelt Sunday worship in Wadala."
    },
    {
      id: "gal-2",
      title: "Worship Team",
      category: "Worship Team",
      imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=80",
      caption: "Our team leading praise in God's presence."
    },
    {
      id: "gal-3",
      title: "Friday Fasting Prayer",
      category: "Friday Fasting Prayer",
      imageUrl: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&w=900&q=80",
      caption: "Corporate fasting and intercession."
    },
    {
      id: "gal-4",
      title: "Sanctuary",
      category: "Church Building",
      imageUrl: "https://images.unsplash.com/photo-1548625361-195972834b64?auto=format&fit=crop&w=900&q=80",
      caption: "A peaceful place of worship in Wadala East."
    },
    {
      id: "gal-5",
      title: "Church Fellowship",
      category: "Church Family",
      imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80",
      caption: "Growing together in Christian love."
    },
    {
      id: "gal-6",
      title: "Special Celebrations",
      category: "Special Programs",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
      caption: "Blessings and thanksgiving services."
    },
    {
      id: "gal-7",
      title: "Prayer Meeting",
      category: "Prayer Meetings",
      imageUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=900&q=80",
      caption: "Lifting our hands in prayer."
    },
    {
      id: "gal-8",
      title: "Community Outreach",
      category: "Church Events",
      imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=900&q=80",
      caption: "Sharing God's love in Mumbai."
    }
  ],
  events: [
    {
      id: "event-1",
      title: "Sunday Worship Celebration",
      date: "Every Sunday",
      time: "12:00 PM – 2:00 PM",
      description: "Heartfelt praise, biblical preaching, and fellowship in Wadala.",
      location: "Sanctuary, East Wadala, Mumbai",
      image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80",
      tag: "Weekly Worship"
    },
    {
      id: "event-2",
      title: "Friday Fasting Prayer",
      date: "Every Friday",
      time: "8:30 PM – 9:30 PM",
      description: "Dedicated evening of fasting and interceding for families and breakthroughs.",
      location: "Mighty Nation Church, Wadala",
      image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&w=800&q=80",
      tag: "Prayer"
    },
    {
      id: "event-3",
      title: "Praise & Thanksgiving Service",
      date: "Special Schedule",
      time: "Evening Vigil",
      description: "An evening of testimony, worship, and celebrating God's goodness.",
      location: "Sanctuary, East Wadala",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
      tag: "Special Service"
    }
  ]
};
