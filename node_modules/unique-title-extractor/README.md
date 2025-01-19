# Unique Title Extractor

A Node.js package to group and extract unique titles based on cosine similarity.

## Installation

```bash

npm  install  unique-title-extractor

```

## Usage

```bash

const { getUniqueTitles } = require("unique-title-extractor");

// Example titles
const headlines = [
  "Breaking News: Market Updates",
  "Market Updates: Breaking News",
  "Sports Highlights of the Week",
  "Week's Highlights: Sports Edition"
];

const { groups, uniqueTitles } = getUniqueTitles(headlines, 0.5);

console.log("Groups:", groups);
console.log("Unique Titles:", uniqueTitles);


```

## Parameters

- `headlines` (Array): An array of strings (titles).
- `threshold` (Number): Cosine similarity threshold for grouping (default: 0.4).

## Output

- `groups`: Groups of similar titles.
- `uniqueTitles`: The first title from each group.
