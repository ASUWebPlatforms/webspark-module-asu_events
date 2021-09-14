(function ($, Drupal, drupalSettings) {

  Drupal.behaviors.asuEvents = {
    attach: function (context, settings) {
      var componentLoaded = typeof events !== "undefined" && typeof events.initCardsListEventsComponent !== "undefined";
      var eventsExist = typeof settings.asu.components !== "undefined" && typeof settings.asu.components.asu_events !== "undefined";

      if (!componentLoaded || !eventsExist) {
        return;
      }

      for (var eventsId in settings.asu.components.asu_events) {
        var eventsData = settings.asu.components.asu_events[eventsId];
        console.log();
        switch(eventsData.display) {
          case 'All':
            events.initCardsListEventsComponent({
              targetSelector: "#events-wrapper-" + eventsId,
              props: {
                header: eventsData.header,
                ctaButton: eventsData.ctaButton,
                dataSource: {
                  url:
                    '/asu-events-feed/',
                },
              }
            })
            break;
          case 'Three':
            events.initCardsListEventsComponent({
              targetSelector: "#events-wrapper-" + eventsId,
              props: {
                header: eventsData.header,
                ctaButton: eventsData.ctaButton,
                dataSource: {
                  url:
                    '/asu-events-feed/',
                },
                // changing max items rendered
                maxItems: 3,
              }
            })
            break;
          case 'ThreeCards':
            events.initCardsGridEventsComponent({
              targetSelector: "#events-wrapper-" + eventsId,
              props: {
                header: eventsData.header,
                ctaButton: eventsData.ctaButton,
                dataSource: {
                  url:
                    '/asu-events-feed/',
                  // Example with filters(not needed)
                  filters: "easy_on_the_wallet,alumni_association,staff,sports",
                },
              }
            })
            break;
        }
        //delete settings.asu.components.asu_events[eventsId];
      }
    }
  };
})(jQuery, Drupal, drupalSettings);