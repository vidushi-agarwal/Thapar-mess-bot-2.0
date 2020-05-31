// Copyright 2019, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

"use strict";

const {
  dialogflow,
  SimpleResponse,
  BasicCard,
  Button,
  Image,
  BrowseCarousel,
  BrowseCarouselItem,
  Suggestions,
  LinkOutSuggestion,
  MediaObject,
  Table,
  List,
  Carousel,
} = require("actions-on-google");
const functions = require("firebase-functions");

const app = dialogflow({ debug: true });

// [START df_js_ssml_demo]
app.intent("SSML", (conv) => {
  conv.ask(
    `<speak>` +
    `Here are <say-as interpet-as="characters">SSML</say-as> examples.` +
    `Here is a buzzing fly ` +
    `<audio src="https://actions.google.com/sounds/v1/animals/buzzing_fly.ogg"></audio>` +
    `and here's a short pause <break time="800ms"/>` +
    `</speak>`
  );
  conv.ask("Which response would you like to see next?");
});
// [END df_js_ssml_demo]


// [START df_js_suggestion_chips]
app.intent("Suggestion Chips", (conv) => {
  if (!conv.screen) {
    conv.ask("Chips can be demonstrated on screen devices.");
    conv.ask("Which response would you like to see next?");
    return;
  }

  conv.ask("These are suggestion chips.");
  conv.ask(new Suggestions("Suggestion 1"));
  conv.ask(new Suggestions(["Suggestion 2", "Suggestion 3"]));
  conv.ask(
    new LinkOutSuggestion({
      name: "Suggestion Link",
      url: "https://assistant.google.com/",
    })
  );
  conv.ask("Which type of response would you like to see next?");
});
// [END df_js_suggestion_chips]

// [START df_js_media_response]
app.intent("Media Response", (conv) => {
  if (
    !conv.surface.capabilities.has("actions.capability.MEDIA_RESPONSE_AUDIO")
  ) {
    conv.ask("Sorry, this device does not support audio playback.");
    conv.ask("Which response would you like to see next?");
    return;
  }
  conv.ask("Fuck You");
  console.log("Fuck Youuuuuuuuuuuuu");
  conv.ask("This is a media response example.");

  conv.ask(
    new MediaObject({
      name: "Jazz in Paris",
      url: "https://storage.googleapis.com/automotive-media/Jazz_In_Paris.mp3",
      description: "A funky Jazz tune",
      icon: new Image({
        url: "https://storage.googleapis.com/automotive-media/album_art.jpg",
        alt: "Album cover of an ocean view",
      }),
    })
  );
  conv.ask(
    new Suggestions(["Basic Card", "List", "Carousel", "Browsing Carousel"])
  );
});
// [END df_js_media_response]


// [START df_js_list]
app.intent("Sample1", (conv) => {
  conv.ask(" Hi, Whats been up! ");
  if (!conv.screen) {
    conv.ask(
      "Sorry, try this on a screen device or select the " +
      "phone surface in the simulator."
    );
    return;
  }

  conv.ask("Select your Hostel");
  // Create a list
  conv.ask(
    new List({
      title: "List_Hostel",
      items: {
        // Add the first item to the list
        SELECTION_KEY_Hostel_A: {
          synonyms: ["Hostel A", "A", "A Hostel "],
          title: "Hostel A",
          description: "This is Hostel A ",
          image: new Image({
            url:
              "https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png",
            alt: "Image alternate text",
          }),
        },
        // Add the second item to the list
        SELECTION_KEY_Hostel_B: {
          synonyms: ["Hostel B", "B", "B Hostel"],
          title: "Hostel B",
          description: "This is Hostel B ",
          image: new Image({
            url:
              "https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png",
            alt: "Google Home",
          }),
        },
        // Add the third item to the list
        SELECTION_KEY_Hostel_C: {
          synonyms: ["Hostel C", "C", "C Hostel"],
          title: "Hostel C",
          description: "This is Hostel C",
          image: new Image({
            url:
              "https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png",
            alt: "Google Pixel",
          }),
        },
      },
    })
  );
});
// [END df_js_list]
app.intent("Sample2", (conv) => {
  console.log("Bitch , Fcuk you");
});

// [START df_js_list_selected]
app.intent("Sample2", (conv, params, option) => {
  const SELECTED_ITEM_RESPONSES = {
    SELECTION_KEY_Hostel_A: "You selected the Hostel A",
    SELECTION_KEY_Hostel_B: "You selected the Hostel B",
    SELECTION_KEY_Hostel_C: "You selected the Hostel C",
  };
  conv.ask(SELECTED_ITEM_RESPONSES[option]);
  conv.ask("Please give the meal");

  conv.ask(
    new List({
      title: "Meals Type",
      items: {
        // Add the first item to the list
        SELECTION_KEY_Breakfast: {
          synonyms: ["Breakfast", "morning food", "morning meal "],
          title: "Breakfast",
          description: "This is Breakfast ",
          image: new Image({
            url:
              "https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png",
            alt: "Image alternate text",
          }),
        },
        // Add the second item to the list
        SELECTION_KEY_Lunch: {
          synonyms: ["Lunch", "noon food", "noon meal"],
          title: "Lunch",
          description: "This is Lunch",
          image: new Image({
            url:
              "https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png",
            alt: "Google Home",
          }),
        },
        // Add the third item to the list
        SELECTION_KEY_Dinner: {
          synonyms: ["Dinner", "night food", "night meal"],
          title: "Dinner",
          description: "This is Dinner",
          image: new Image({
            url:
              "https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png",
            alt: "Google Pixel",
          }),
        },
      },
    })
  );
});

// [END df_js_lsist_selected]

// [START df_js_list_selected_selected]
app.intent("Sample3", (conv, params, option) => {
  const SELECTED_ITEM_RESPONSES = {
    SELECTION_KEY_Breakfast: "You selected Breakfast",
    SELECTION_KEY_Lunch: "You selected Lunch",
    SELECTION_KEY_Dinner: "You selected Dinner",
  };
  conv.ask(SELECTED_ITEM_RESPONSES[option]);
  conv.ask("Please select the time, you can also type your custom time");
  conv.ask(
    new Suggestions([
      "Today",
      "Tomorrow",
      "Yesterday",
      "April 26",
      "2020-04-26",
    ])
  );
});
// [END df_js_list_selected]

// [START df_js_list_selected_selected]
app.intent("Sample4", (conv, { date_time }) => {
  conv.ask(`Thanks for selecting time ${date_time}`);
  conv.ask("Here is the meal,   Do you want more?");
  conv.ask(new Suggestions(["No", "Yes"]));
});

app.intent("Sample4 - yes", (conv) => {
  conv.ask("Change anything you want");
  conv.ask(new Suggestions(["Meal type", "Meal Time", "Your Hostel"]));
});
// [END df_js_list_selected]


exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
