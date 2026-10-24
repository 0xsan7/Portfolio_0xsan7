# Performance changes, 25 October 2026

Compared the deployed-source baseline with the optimized source using Lighthouse 13.5.0 against the same local HTTP preview and headless Chrome session. Both runs used mobile simulated throttling: 150ms RTT, 1638.4 Kbps throughput, and 4x CPU slowdown. These are lab measurements, not a guarantee of live scores on other devices or networks.

| Measurement | Baseline | Optimized |
| --- | ---: | ---: |
| Performance score | 74 | 99 |
| First contentful paint | 1.8s | 1.4s |
| Largest contentful paint | 11.0s | 2.1s |
| Total blocking time | 0ms | 30ms |
| Cumulative layout shift | 0 | 0 |
| Speed index | 1.8s | 1.4s |
| Total page payload | 2344 KiB | 442 KiB |

The banner's 1,837,740-byte animated WebP is replaced by a 33,708-byte first-paint poster and a 239,393-byte WebM loop, with a 271,003-byte MP4 fallback. Only the supported video format is requested. Logo variants are 96/192px; the larger WebP is 10,146 bytes instead of the original 108,760-byte JPEG.

The initial enhancement entry is 3,791 bytes instead of the roughly 300KB combined React bundle. React, project folders, skyline and halftone code are separate lazy chunks. Native dock icons and FlowButton markup are rendered during the build; the native dock uses no runtime React. The original typography is self-hosted and primary CSS is inline. ResizeObserver dimensions replace repeated offsetWidth/offsetHeight measurements during button setup.

GitHub Pages' cache TTL is hosting-controlled. All lazy chunks have content hashes. The live audit can vary with CDN location, cache state, connection, and browser scheduling.

Optimization reference: https://web.dev/articles/optimize-lcp
