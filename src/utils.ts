export function getMessage(status: string) {
  switch (status) {
    case 'initialized':
      return 'We are preparing your order...';
    case 'ready':
      return 'Please click the button when you have arrived. One of our friendly staff will bring your order to you.';
    case 'error':
      return 'Seems something went wrong, you can call the following number to notify us instead.';
  }
}
