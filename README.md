# NodeWatch Frontend (UI)

A web-based user interface will be developed to display the data collected by a [devp2p crawler](https://github.com/ChainSafe/eth2-crawler) targeted at Eth2 nodes. It will contain the following:

- Client breakdown by agent type
- Toggle connectable vs all seen in last month
- Client-version breakdown
- Regional breakdown with map
- IP type where possible – hosted, residential, etc

# Running the project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and using [Craco](https://github.com/gsoft-inc/craco) for configuration.

Provide the crawler graphql endpoint in a `.env` file in root as per `.env.template`.

To run in development mode

```
yarn install
yarn start
```

To build

```
yarn install
yarn build
```

# LICENSE

See the [LICENSE](https://github.com/ChainSafe/eth2-crawler-ui/blob/main/LICENSE) file for license rights and limitations (lgpl-3.0).
