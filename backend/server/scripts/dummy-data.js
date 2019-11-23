const loopback = require("loopback");

module.exports.category = [
  {
    name: "Food"
  },
  {
    name: "Clothing"
  },
  {
    name: "Toys"
  },
  {
    name: "Cosmetics"
  },
  {
    name: "Divers"
  }
];

module.exports.shop = [
  {
    name: "Hugo Boss",
    location: new loopback.GeoPoint({ lat: 34.001678, lng: -6.853718 }),
    categoryId: 2,
    thumbnailUrl:
      "https://drive.google.com/uc?id=1dovAaDrXPDwpq4zkscy7zZbJLHUZp0dw",
    imageUrl: "https://drive.google.com/uc?id=1W2Ft44AAE--tE1r68wFFLMTKs9o6gyzU"
  },
  {
    name: "Grocerjar",
    location: new loopback.GeoPoint({ lat: 33.997178, lng: -6.857991 }),
    categoryId: 1,
    thumbnailUrl:
      "https://drive.google.com/uc?id=1Y81wQGcjUK1Rrbf0PNXoem_J1gB0W8AM",
    imageUrl: "https://drive.google.com/uc?id=1sR0MzibsM4eGvyZDze5xmpfRuUPO7g3j"
  },
  {
    name: "Salouse",
    location: new loopback.GeoPoint({ lat: 34.010798, lng: -6.857201 }),
    categoryId: 1,
    thumbnailUrl:
      "https://drive.google.com/uc?id=1VtSayk7e43Nh9XZ0vFbFnMHppWhK2e_P",
    imageUrl: "https://drive.google.com/uc?id=1NF3NSZ8PbNkWZy9lquRTZ6JQnPjHhTv_"
  },
  {
    name: "Bakero",
    location: new loopback.GeoPoint({ lat: 34.001078, lng: -6.853718 }),
    categoryId: 5,
    thumbnailUrl:
      "https://drive.google.com/uc?id=19gNQEaVu4RhmQJEeVTnwEc1xoY_l-iiQ",
    imageUrl: "https://drive.google.com/uc?id=1s5SFsn1zkDG3yM-OYU94NrH2AbsOMtTe"
  },
  {
    name: "Lush",
    location: new loopback.GeoPoint({ lat: 33.949267, lng: -6.819381 }),
    categoryId: 4,
    thumbnailUrl:
      "https://drive.google.com/uc?id=1epQu3Am_-3LF5ZLcGGOlOoiQl0LHaFiO",
    imageUrl: "https://drive.google.com/uc?id=1n9WJTgH88-V6eh2HKH4fXnJoB-tl-pKS"
  },
  {
    name: "Poppets",
    location: new loopback.GeoPoint({ lat: 33.948934, lng: -6.887049 }),
    categoryId: 3,
    thumbnailUrl:
      "https://drive.google.com/uc?id=1BZL4tpZbbFyeHl2RfKNfTYefOeoLB4wi",
    imageUrl: "https://drive.google.com/uc?id=1VDpZ4zHrBvDpyXzbHUFKfSMgx8c-x7JR"
  },
  {
    name: "Chheda",
    location: new loopback.GeoPoint({ lat: 34.146997, lng: -6.703102 }),
    categoryId: 1,
    thumbnailUrl:
      "https://drive.google.com/uc?id=1h3bINLcwCMNWFXFyFpL2IyvY0IqXfRVm",
    imageUrl: "https://drive.google.com/uc?id=1lpQHE4cRqKVPZ8i0C3mcEUTHuWeqjaOZ"
  }
];
