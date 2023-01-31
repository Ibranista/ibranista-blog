interface actionCode {
  url: string;
  handleCodeInApp: boolean;
  iOS: {
    bundleId: string;
  };
  android: {
    packageName: string;
    installApp: boolean;
    minimumVersion: string;
  };
  dynamicLinkDomain: string;
}

export const actionCodeSettings: actionCode = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "https://www.example.com/finishSignUp?cartId=1234",
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: "com.example.ios",
  },
  android: {
    packageName: "com.example.android",
    installApp: true,
    minimumVersion: "12",
  },
  dynamicLinkDomain: "example.page.link",
};
