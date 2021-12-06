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
        switch(eventsData.display) {
          case 'All':
            events.initCardsListEventsComponent({
              targetSelector: "#events-wrapper-" + eventsId,
              props: {
                header: eventsData.header,
                ctaButton: eventsData.ctaButton,
                dataSource: eventsData.dataSource,
                maxItems: 9,
              }
            })
            break;
          case 'Three':
            events.initCardsListEventsComponent({
              targetSelector: "#events-wrapper-" + eventsId,
              props: {
                header: eventsData.header,
                ctaButton: eventsData.ctaButton,
                dataSource: eventsData.dataSource,
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
                dataSource: eventsData.dataSource,
                maxItems: 3,
              }
            })
            break;
        }
        delete settings.asu.components.asu_events[eventsId];
      }
    }
  };
})(jQuery, Drupal, drupalSettings);
