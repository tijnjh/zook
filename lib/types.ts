export interface DdgResponse {
  Heading: string;
  Abstract: string;
  Image: string;
  Results: {
    FirstURL: string;
  }[];
  RelatedTopics: {
    FirstURL: string;
  }[];
}
