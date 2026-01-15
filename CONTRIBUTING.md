# Contributing to Framework Tracker

Framework Tracker is part of the e18e.dev community. Want to get involved head to our Discord at https://chat.e18e.dev.

## Where to Start

Framework Tracker has a few different areas which you can contribute to:

- **Improving Metrics**: Suggest new metrics or improve the way we collect and display existing ones. Find out current roadmap and metrics in [initial-comparison-list.md](./initial-comparison-list.md#ComparableMetrics).

- **Documentation**: Enhance our documentation site by fixing typos, improving explanations, or adding new sections. UI/UX improvements are also welcome!

- **Adding New Frameworks**: Help us expand our list of tracked frameworks by adding new ones. Check out [initial-comparison-list.md](./initial-comparison-list.md#frameworks) for the list of planned tracked frameworks. Be careful when adding a new framework as in its current state adding a new framework adds to the maintenance burden.

### How Metrics Work

We currently run scripts in the CI to measure and collect metrics for each framework. Right now we measure each frameworks starter project.

The current flow for collecting metrics is as follows:

1. A PR is merged which triggers the CI Pipeline: `generate-stats`
2. The CI Pipeline runs and measures different metrics for each framework
3. The collected metrics are passed into the final step which runs the scripts in `stats-generator`
4. The `stats-generator` does some measure of its own and then creates a content.json file for each framework in the Astro docs site.

