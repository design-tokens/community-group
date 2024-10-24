# Data model

There are 2 kinds of entities that this spec defines: Groups and design tokens. Together, they form a tree data structure. The root node is always a group. Group nodes can contain child nodes which are either other groups or design tokens. Design tokens nodes cannot have children and are therefore always leaf nodes.

<figure>

![Diagram depicting an example tree structure made of group and design token nodes](./data-model.svg)

  <figcaption>Visual representation of an example tree structure consisting of group and design token nodes</figcaption>
</figure>

The file format defined by this specification is a serialisation of that data structure.

<figure>

![Diagram of a file on one side and a group and desing token tree on the other. An arrow pointing from the file to the data structure is labelled "parse". Another arrow pointing in the opposite direction is labelled "serialize".](./parse-serialize.svg)

  <figcaption>Illustration of the relationship between a design token file and the corresponding data model</figcaption>
</figure>
