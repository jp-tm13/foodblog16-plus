// external dependencies
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import memoize from "memoize";
import * as uuid from "uuid";
import { useRef } from "react";

const uuidCache = new Set();

const memoizedCreateCacheWithContainer = memoize((container) => {
  // Emotion only accepts alphabetical and hyphenated keys so we just
  // strip the numbers from the UUID. It _should_ be fine.
  let key = uuid.v4().replace(/[0-9]/g, "");
  while (uuidCache.has(key)) {
    key = uuid.v4().replace(/[0-9]/g, "");
  }
  uuidCache.add(key);
  return createCache({ container, key });
});

export function StyleProvider(props) {
  const { children, document } = props;
  const ref = useRef();

  if (!document) {
    return null;
  }

  const cache = memoizedCreateCacheWithContainer(document.head);

  return (
    <CacheProvider ref={ref} value={cache}>
      {children}
    </CacheProvider>
  );
}

export default StyleProvider;
