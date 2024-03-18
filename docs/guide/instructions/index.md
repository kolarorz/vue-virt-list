# Special Instructions

## Million level data

Currently, due to the browser's maximum height limit, the scrollbar cannot continue scrolling beyond a certain height. In the example, there are approximately 380000 rows of data online. The follow-up author plans to achieve the display of million level data by simulating the scrollbar themselves

## Scrolling performance

This virtual list supports full frame rendering, but in big data or complex dom scenes, users should avoid two issues themselves:

1. List data should use non responsive data ShallowRef instead of responsive data Ref
2. Complex DOM should separate the rendering layer and interaction layer, and the rendering layer DOM should be minimalist.

## Fix scrolling selection issue

Fix only the bug in the diff algorithm under vue2 (during the scrolling down process of the list, the vue2 diff algorithm will cause the entire list to be re mounted)
