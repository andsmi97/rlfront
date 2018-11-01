import React, { Component } from "react";
// import Accordion from './Components/AccordionSection/Accordion'
import { TabProvider, Tab, TabPanel, TabList } from "react-web-tabs";
class App extends Component {
  render() {
    return (
      <div className="App">
        <TabProvider defaultTab="one">
          <section className="my-tabs">
            <TabList className="my-tablist">
              <Tab tabFor="one">Добавить</Tab>

              <Tab tabFor="two">Изменить</Tab>
              <Tab tabFor="three" className="my-tab">
                Удалить
              </Tab>
            </TabList>
            <div className="wrapper">
              <TabPanel tabId="one">
                <p>Tab 1 content</p>
              </TabPanel>
              <TabPanel tabId="two">
                <p>Tab 2 content</p>
              </TabPanel>
              <TabPanel tabId="three">
                <p>Tab 3 content</p>
              </TabPanel>
            </div>
          </section>
        </TabProvider>
        {/* <div>
          <h1>Accordion Demo</h1>
          <Accordion>
            <div label="Alligator Mississippiensis">
              <p>
                <strong>Common Name:</strong> American Alligator
              </p>
              <p>
                <strong>Distribution:</strong> Texas to North Carolina, US
              </p>
              <p>
                <strong>Endangered Status:</strong> Currently Not Endangered
              </p>
            </div>
            <div label="Alligator Sinensis">
              <p>
                <strong>Common Name:</strong> Chinese Alligator
              </p>
              <p>
                <strong>Distribution:</strong> Eastern China
              </p>
              <p>
                <strong>Endangered Status:</strong> Critically Endangered
              </p>
            </div>
          </Accordion>
        </div> */}
      </div>
    );
  }
}

export default App;
