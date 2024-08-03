import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const driverTour = driver({
  showProgress: true,
  steps: [
    {
      popover: {
        title: "Let's get acquainted!\n",
        side: "top",
        align: "start",
      },
    },
    {
      element: "#model-styles",
      popover: {
        title: "Here you can choose a ready-made style\n",
        description: "Or choose 'no style'\n",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: "#model-version",
      popover: {
        title: "Here you can choose a ready-made style\n",
        description: "Or choose 'no style'\n",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: "#image-size",
      popover: {
        title: "Here you can choose a ready-made style\n",
        description: "Or choose 'no style'\n",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: "#negative-prompt",
      popover: {
        title: "Here you can choose a ready-made style\n",
        description: "Or choose 'no style'\n",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: "#message-input",
      popover: {
        title: "Here you can choose a ready-made style\n",
        description: "Or choose 'no style'\n",
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
});
