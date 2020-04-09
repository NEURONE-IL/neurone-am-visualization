# Neurone AM Visualization

Neurone-am-visualization is part of the Neurone-AM (active monitoring) solution, compose of [neurone-am-coordinator](https://github.com/NEURONE-IL/neurone-am-coordinator.git) and [neurone-am-connector](https://github.com/NEURONE-IL/neurone-am-connector.git) also. All three components interact with each other to deliver real-time updated metrics over a persistent connection and provides tools for monitoring all users of [NEURONE](https://github.com/NEURONE-IL/neurone) search engine. To deploy all components together go to [neurone-am-deployment](https://github.com/NEURONE-IL/neurone-am-deployment.git) repository.

Visualization component is a Front-end prototype client that allow to a observer visualize the behavior and performance of all users. Therefore, through this component differents metrics are displayed and actualized in a defined update interval. This component interact directly with neurone-am-coordinator through subscription and consumption of previously selected metrics. 


## Neurone AM Views

There are three principal views that composed the component. This are defined below:

* Configuration View: It is the frist view accesed for the observer and allow configure all parameters associates to the monitoring session. For example, metrics, principal metric or update interval.
* Observation panel view: This is the principal view of the component. Throght it the observer can visualice the selected metrcis previously for all participants of the session. Also, the metrics are updated in real time periodically.
* Details view: It is a complementary view for the observation panel. Throught it the observer can request metrics values for a specific participant in a defined range time.

For mor details about the component view see the user guide in the [release] (https://github.com/NEURONE-IL/neurone-am-visualization/releases).

## Install Instructions

#### Development

The principal tool used to build this component is [Vue.js](https://vuejs.org/) framework. The instructions listed below must be following to run the project in development mode:

1. Install npm. Version 6+ is recomended.
2. Download or clone the project files.
3. Set up enviroment variables (See the configuration section below).
4. Run `npm install` to install dependencies.
5. To start the project, run `npm run serve`.
6. Access the component through the browser in the configured port.

#### Production

The deployment of the component is over [Docker](https://www.docker.com/). Therefore, it must be installed before follow the instructions below.

1. Download or clone the project directory.
2. Go to the project root
3. Set up enviroment variables.
4. Run `./runDocker.sh` script to init a docker instance.
5. Access the component through the browser.

#### Package component
1. Download or clone the code.
2. Go to the root project folder.
3. Run `npm run build`.

#### Configuration
The component iteract with neurone-am-coordinator. Therefore, its url must be configured in a .env file in the root folder. Below there is a example. 

```env
VUE_APP_API_URL=http://localhost:7999
```

## License 

Licensed under the GNU Affero General Public License (Version 3) [LICENSE](LICENSE) ; you may not use this software except in compliance with the License.

