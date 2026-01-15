# Contributing to Framework Tracker

Framework Tracker is part of the e18e.dev community. Want to get involved head to our Discord at https://chat.e18e.dev.

## Where to Start

Framework Tracker has a few different areas where you can contribute to:

- **Improving Metrics**: Suggest new metrics or improve the way we collect and display existing ones.
- **Documentation**: Enhance our documentation site by fixing typos, improving explanations, or adding new sections. UI/UX improvements are also welcome!
- **Adding New Frameworks**: Help us expand our list of tracked frameworks by adding new ones and gathering relevant metrics. Check out [initial-comparison-list.md](./initial-comparison-list.md#frameworks) for the list of currently tracked frameworks and metrics. Be careful when adding a new framework as in its current state adding a new framework adds to the maintenance burden.

### How Metrics Work

We currently run scripts into the CI to measure and collect metrics for each framework. Right now we measure each frameworks starter project. In our current pipeline there will be an option to re-implement the same App in each framework to measure certain metrics. (this is why each stats content in the Astro site has a type value of either "starter" or "app".)

The current flow for collecting metrics is as follows:

1. A PR is merged which triggers the CI Pipeline: `generate-stats`
2. The CI Pipeline runs and measures different metrics for each framework
3. The collected metrics are passed into the final step which runs the scripts in `stats-generator`
4. The `stats-generator` does some measure of its own and then create a content.json file for each framework in the Astro docs site.

