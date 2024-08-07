import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const getDriver = (isMobile: boolean) =>
  driver(
    isMobile
      ? {
          showProgress: true,
          animate: true,
          disableActiveInteraction: true,
          steps: [
            {
              popover: {
                title: "Let's get acquainted!",
                side: "top",
                align: "start",
              },
            },
            {
              element: "#mobile-settings-button",
              popover: {
                title: "Here you can open settings",
                description: "Click on it",
                side: "bottom",
                align: "start",
                onNextClick: () => {
                  const button = document.querySelector(
                    "#mobile-settings-button"
                  ) as HTMLButtonElement;
                  button.click();
                  setTimeout(() => getDriver(isMobile).moveNext(), 0);
                },
              },
            },
            {
              element: "#mobile-model-styles",
              popover: {
                title: "Here you can choose a ready-made style",
                description: "Or choose 'no style'",
                side: "bottom",
                align: "start",
              },
            },
            {
              element: "#mobile-model-version",
              popover: {
                title: "Here you can",
                description: "(actually can't) choose model version",
                side: "bottom",
                align: "start",
              },
            },
            {
              element: "#mobile-image-size",
              popover: {
                title: "Here you can set image size",
                description: "Must be square 1:1",
                side: "top",
                align: "start",
              },
            },
            {
              element: "#mobile-negative-prompt",
              popover: {
                title: "Here you can type negative prompt",
                side: "top",
                align: "start",
                onNextClick: () => {
                  const button = document.querySelector(
                    "#mobile-settings-button"
                  ) as HTMLButtonElement;
                  button.click();
                  setTimeout(() => getDriver(isMobile).moveNext(), 0);
                },
              },
            },
            {
              element: "#message-input",
              popover: {
                title: "Here you can type your prompt",
                side: "bottom",
                align: "start",
              },
            },
            {
              popover: {
                title: "Have a great drawing!",
              },
            },
          ],
        }
      : {
          showProgress: true,
          animate: true,
          steps: [
            {
              popover: {
                title: "Let's get acquainted!",
                side: "top",
                align: "start",
              },
            },
            {
              element: "#desktop-model-styles",
              popover: {
                title: "Here you can choose a ready-made style",
                description: "Or choose 'no style'",
                side: "bottom",
                align: "start",
              },
            },
            {
              element: "#desktop-model-version",
              popover: {
                title: "Here you can",
                description: "(actually can't) choose model version",
                side: "bottom",
                align: "start",
              },
            },
            {
              element: "#desktop-image-size",
              popover: {
                title: "Here you can set image size",
                description: "Must be square 1:1",
                side: "top",
                align: "start",
              },
            },
            {
              element: "#desktop-negative-prompt",
              popover: {
                title: "Here you can type negative prompt",
                side: "top",
                align: "start",
              },
            },
            {
              element: "#message-input",
              popover: {
                title: "Here you can type your prompt",
                side: "bottom",
                align: "start",
              },
            },
            {
              popover: {
                title: "Have a great drawing!",
              },
            },
          ],
        }
  );
