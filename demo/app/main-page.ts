import { Sentry, TNS_SentryBreadCrumb } from 'nativescript-sentry';
import { TNS_SentryLevel } from 'nativescript-sentry/sentry.common';
import { EventData } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import { HelloWorldModel } from './main-view-model';


// Event handler for Page 'loaded' event attached in main-page.xml
export function pageLoaded(args: EventData) {
  // Get the event sender
  const page = args.object as Page;
  page.bindingContext = new HelloWorldModel();
}

export function onTapMain(eventData) {
  throw 'Uncaught Error Exception thrown inside NativeScript app.';
}

export function onTapTry(eventData) {
  try {
    throw new Error('Not good');
  } catch (error) {
    Sentry.captureException(error, {});
  }
}

export function message() {
  Sentry.captureMessage('brad test', TNS_SentryLevel.Info);
}

export function onTapBreadcrumb() {
  try {
    const breadcrumb: TNS_SentryBreadCrumb = {
      message: 'bazinga, you got a breadcrumb message',
      category: 'breadcrumb category',
      level: TNS_SentryLevel.Info
    };
    Sentry.captureBreadcrumb(breadcrumb);
  } catch (error) {
    console.log('app error', error);
  }
}
