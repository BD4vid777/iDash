import { inject, InjectionToken, PLATFORM_ID } from "@angular/core";

export const WINDOW = new InjectionToken<Window>('WindowToken', {
  providedIn: 'root',
  factory: () => {
    const platform = inject(PLATFORM_ID)
    console.log('Platform type: ', platform)
    return platform == 'browser' ? window : {} as Window
  }
});
