# Special Instructions

## Millions rows of data

Currently limited by the maximum height restriction of the browser, the scrollbar cannot continue to scroll after exceeding a certain height. In the example, the data limit is approximately 380,000 rows. The author plans to implement the display of millions of rows of data by simulating the scrollbar themselves in future updates.

## scrolling performance

This virtual list supports full-frame rendering, but in scenarios with large data or complex DOM, users should actively avoid two issues:

1. List data should use non-reactive data `ShallowRef` instead of reactive data `Ref`.
2. Complex DOM should separate the rendering layer and interaction layer. The rendering layer DOM should be extremely simple.

## fix selection

Fixed a bug in the Vue 2 diff algorithm (during the downward scrolling of the list, the Vue 2 diff algorithm would cause the entire list to remount).

## shallowRef

无论是使用VirtList还是使用VirtGrid，一旦使用了响应式。就需要使用提供的forceUpdate方法来更新list长度变化。对于item内容变化，需要自行使用renderKey来进行相应更新。
具体demo请参考: https://keno-lee.github.io/vue-virt-list/examples/huge-data/
