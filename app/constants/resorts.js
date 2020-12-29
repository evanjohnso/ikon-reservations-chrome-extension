export const SKI_RESORTS = {
  bigsky: resortLookup("bigsky"),
  brighton: resortLookup("brighton"),
  crystal: resortLookup("crystal"),
  snoqualmie: resortLookup("snoqualmie"),
  winterpark: resortLookup("winterpark"),
};

export const defaultResort = Object.keys(SKI_RESORTS)[0];

export function resortLookup(resort) {
  switch (resort) {
    case "bigsky":
      return { label: "Big Sky", code: 4 };
    case "brighton":
      return { label: "Brighton", code: 8 };
    case "crystal":
      return { label: "Crystal", code: 10 };
    case "snoqualmie":
      return { label: "Snoqualmie", code: 29 };
    case "winterpark":
      return { label: "Winter Park", code: 34 };
  }
}
