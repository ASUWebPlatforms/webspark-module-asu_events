<?php

namespace Drupal\asu_events\Controller;

use Drupal\Core\Controller\ControllerBase;
use GuzzleHttp\Exception\GuzzleException;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * An example controller.
 */
class AsuEventsController extends ControllerBase {

  /**
   * Returns a render-able array.
   */
  public function content($filter) {
    $result = '';
    $client = \Drupal::httpClient();
    try {
      $config = \Drupal::config('asu_events.settings');
      $fedd_url = $config->get('asu_events_feed_url');
      $url = $fedd_url . $filter;
      $request = $client->get($url);
      $code = $request->getStatusCode();
      if ($code == 200) {
        $content = $request->getBody()->getContents();
        $file_contents = json_decode($content);
        $result = new JsonResponse($file_contents);
      }
    }
    catch (RequestException $e) {
      \Drupal::logger('asu_events')->error($e->getMessage());
    }
    return $result;
  }

}
