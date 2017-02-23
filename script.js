function callGO() {
  var $ = go.GraphObject.make; 
  folderDiagram =
    $(go.Diagram, "diagram-wrap", {
      allowMove: false,
      allowCopy: false,
      allowDelete: false,
      allowHorizontalScroll: false,
      initialContentAlignment: go.Spot.Top,
      layout: $(go.TreeLayout, {
        alignment: go.TreeLayout.AlignmentStart,
        angle: 0,
        compaction: go.TreeLayout.CompactionNone,
        layerSpacing: 30,
        layerSpacingParentOverlap: 1,
        nodeIndent: 1,
        nodeIndentPastParent: 1,
        nodeSpacing: 0
      })
    });
  folderDiagram.nodeTemplate =
    $(go.Node, { 
        selectionAdorned: false
      },
      {
        isTreeExpanded: false
      },
      $("TreeExpanderButton", {
        width: 14,
        "ButtonBorder.fill": "#d9dee6",
        "ButtonBorder.stroke": null,
        "_buttonFillOver": "#a1adbf",
        "_buttonStrokeOver": null
      }),
      $(go.Panel, "Horizontal", 
        { position: new go.Point(20, 0) },
        new go.Binding("background", "isSelected", function(s) {
          return (s ? "lightblue" : "white");
        }).ofObject(),
        $(go.Picture, {
            width: 18,
            height: 18,
            margin: new go.Margin(0, 4, 0, 0),
            imageStretch: go.GraphObject.Uniform
          },
          new go.Binding("source", "isTreeExpanded", imageConverter).ofObject(),
          new go.Binding("source", "isTreeLeaf", imageConverter).ofObject()),
        $(go.TextBlock, { font: '15px Verdana, sans-serif' },
          new go.Binding("text", "name")
        ), 
        {
          toolTip: 
            $(go.Adornment, "Auto",
            $(go.Shape, { fill: "#ced6e4" }),
            $(go.TextBlock, { margin: 4 },
              new go.Binding("text", "desc"))
          )
        }
      ) 
    ); 

  folderDiagram.toolManager.hoverDelay = 300;
  folderDiagram.linkTemplate = $(go.Link);

  folderDiagram.addDiagramListener("InitialLayoutCompleted", function(e) {
    e.diagram.findTreeRoots().each(function(r) { r.expandTree(3); });
  });

  var nodeDataArray = [
    { key: "1", name: "whscommitment", desc: "root directory" },
    { key: "2", parent: "1", name: "includes", desc: "contains files with php functions to be included in the site " },
    { key: "3", parent: "1", name: "misc", desc: "contains miscellaneous assets" },
    { key: "4", parent: "1", name: "modules", desc: "contains core modules that provide basic functionality of Drupal" },
    { key: "5", parent: "1", name: "profiles", desc: "contains installation profiles" },
    { key: "6", parent: "1", name: "scripts", desc: "contains shell scripts" },
    { key: "7", parent: "1", name: "sites", desc: "contains files specific to the site" },
    { key: "8", parent: "1", name: "themes", desc: "contains core themes" },
    { key: "9", parent: "2", name: "database", desc: "" },
    { key: "10", parent: "2", name: "filetransfer", desc: "" },
    { key: "11", parent: "9", name: "database.inc", desc: "" },
    { key: "12", parent: "10", name: "filetransfer.inc", desc: "" },
    { key: "13", parent: "3", name: "jquery.js", desc: "" },
    { key: "14", parent: "3", name: "message-16-error.png", desc: "" },
    { key: "15", parent: "3", name: "progress.gif", desc: "" },
    { key: "16", parent: "4", name: "menu", desc: "" },
    { key: "17", parent: "16", name: "menu.info", desc: "" },
    { key: "18", parent: "16", name: "menu.module", desc: "" },
    { key: "19", parent: "7", name: "all", desc: "contains files created for the site" },
    { key: "20", parent: "7", name: "default", desc: "contains configuration files" },
    { key: "21", parent: "19", name: "libraries", desc: "contains third party libraries" },
    { key: "22", parent: "19", name: "modules", desc: "contains contributed modules that provide extra functionality" },
    { key: "23", parent: "19", name: "themes", desc: "contains contributed themes" },
    { key: "24", parent: "21", name: "flexslider", desc: "" },
    { key: "25", parent: "24", name: "jquery.flexslider.js", desc: "" },
    { key: "26", parent: "22", name: "whs_visualization", desc: "" },
    { key: "27", parent: "26", name: "whs_visualization.module", desc: "" },
    { key: "28", parent: "23", name: "commitment", desc: "custom theme for the WHS Commitment site" },
    { key: "29", parent: "28", name: "css", desc: "contains stylesheets" },
    { key: "30", parent: "28", name: "fonts", desc: "contains font files" },
    { key: "31", parent: "28", name: "images", desc: "contains images" },
    { key: "32", parent: "28", name: "js", desc: "contains scripts" },
    { key: "33", parent: "28", name: "templates", desc: "conatins template files" },
    { key: "34", parent: "28", name: "commitment.info", desc: "file for configuring commitment theme" },
    { key: "35", parent: "20", name: "files", desc: "contains all files uploaded in the site" },
    { key: "36", parent: "20", name: "settings.php", desc: "" },
    { key: "37", parent: "29", name: "style.css", desc: "" },
    { key: "38", parent: "30", name: "themify.ttf", desc: "" },
    { key: "39", parent: "31", name: "tick.png", desc: "" },
    { key: "40", parent: "32", name: "script.js", desc: "" },
    { key: "41", parent: "33", name: "page.tpl.php", desc: "" },
    { key: "42", parent: "8", name: "bartik", desc: "" },
    { key: "43", parent: "42", name: "template.php", desc: "" },
    { key: "44", parent: "8", name: "engines", desc: "" },
    { key: "45", parent: "44", name: "phptemplate", desc: "" },
    { key: "46", parent: "45", name: "phptemplate.engine", desc: "" },
    { key: "47", parent: "8", name: "garland", desc: "" },
    { key: "48", parent: "47", name: "template.php", desc: "" },
    { key: "49", parent: "8", name: "seven", desc: "" },
    { key: "50", parent: "49", name: "template.php", desc: "" },
    { key: "51", parent: "8", name: "stark", desc: "" },
    { key: "52", parent: "51", name: "template.php", desc: "" },
    { key: "53", parent: "5", name: "standard", desc: "" },
    { key: "54", parent: "53", name: "standard.info", desc: "" },
    { key: "55", parent: "6", name: "drupal.sh", desc: "" },
    { key: "56", parent: "35", name: "sample_report.pdf", desc: "" }
  ];
  folderDiagram.model = new go.TreeModel(nodeDataArray);

}

// set node icon based on node type
function imageConverter(prop, picture) {
  var node = picture.part;
  if (node.isTreeLeaf) {
    return "images/document.png";
  } else {
    if (node.isTreeExpanded) {
      return "images/openFolder.png";
    } else {
      return "images/closedFolder.png";
    }
  }
}
