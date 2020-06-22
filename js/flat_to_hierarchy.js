function FlatToHierarchyExample() {
  var raw_data =
  [
    { name:"A",               key:"65",                   parent_key:"" },
    { name:"B",               key:"66",                   parent_key:"" },
    { name:"C",               key:"67",                   parent_key:"" },
    { name:"AA",              key:"6565",                 parent_key:"65" },
    { name:"AB",              key:"6566",                 parent_key:"65" },
    { name:"AC",              key:"6567",                 parent_key:"65" },
    { name:"AD",              key:"6568",                 parent_key:"65" },
    { name:"BA",              key:"6665",                 parent_key:"66" },
    { name:"BB",              key:"6666",                 parent_key:"66" },
    { name:"BC",              key:"6667",                 parent_key:"66" },
    { name:"CA",              key:"6765",                 parent_key:"67" },
    { name:"CB",              key:"6766",                 parent_key:"67" },
    { name:"AAA",             key:"656565",               parent_key:"6565" },
    { name:"AAB",             key:"656566",               parent_key:"6565" },
    { name:"AAC",             key:"656567",               parent_key:"6565" },
    { name:"AAA1",            key:"6565651",              parent_key:"656565" },
    { name:"AAA2",            key:"6565652",              parent_key:"656565" },
    { name:"AAA3",            key:"6565653",              parent_key:"656565" },
    { name:"CBA",             key:"676665",               parent_key:"6766" },
    { name:"CBB",             key:"676666",               parent_key:"6766" },
    { name:"CBA1",            key:"6766651",              parent_key:"676665" },
    { name:"CBA2",            key:"6766652",              parent_key:"676665" },
    { name:"CBA3",            key:"6766653",              parent_key:"676665" },
    { name:"CBB1",            key:"6766661",              parent_key:"676666" },
    { name:"CBB2",            key:"6766662",              parent_key:"676666" },
    { name:"CBB2A",           key:"676666265",            parent_key:"6766662" },
    { name:"CBB2B",           key:"676666266",            parent_key:"6766662" },
    { name:"CBB2BA",          key:"67666626665",          parent_key:"676666266" },
    { name:"CBB2BB",          key:"67666626666",          parent_key:"676666266" },
    { name:"CBB2BC",          key:"67666626667",          parent_key:"676666266" },
    { name:"CBB2BD",          key:"67666626668",          parent_key:"676666266" },
    { name:"CBB2BDA",         key:"6766662666865",        parent_key:"67666626668" },
    { name:"CBB2BDB",         key:"6766662666866",        parent_key:"67666626668" },
    { name:"CBB2BDA1",        key:"67666626668651",       parent_key:"6766662666865" },
    { name:"CBB2BDA2",        key:"67666626668652",       parent_key:"6766662666865" },
    { name:"CBB2BDA3",        key:"67666626668653",       parent_key:"6766662666865" },
  ];

  const flat_data = JSON.parse(JSON.stringify(raw_data));
  // const flat_data = [];

  const node_info = {
    name: "",
    key: "",
    parent_key: "",
    children_names: []
  };
  var tree_data = {
    max_depth: 0,
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: []
  };

  SaveFlatAs8DepthTree();

  function SaveFlatAs8DepthTree() {
    if (flat_data.length === 0) {
      return;
    }
    for (var i = 1; i <= 8; ++i) {
      if (i === 1) {
        SaveRootNodesAtTree();
      } else {
        if (!SaveNodesBelowRootAtTree(i)) {
          break;
        }
      }
    }
  }

  function SaveRootNodesAtTree() {
    var is_root_node_inserted = false;
    for (var i = 0; i < flat_data.length; ++i) {
      if (flat_data[i].parent_key === "") {
        var tmp = JSON.parse(JSON.stringify(node_info));
        tmp["name"] = flat_data[i].name;
        tmp["key"] = flat_data[i].key;
        tmp["parent_key"] = flat_data[i].parent_key;
        tmp["children_names"] = [];
        tree_data["1"].push(JSON.parse(JSON.stringify(tmp)));
        is_root_node_inserted = true;
      }
    }
    tree_data["1"].sort(NodeCompareFunction);
    if (is_root_node_inserted) {
      tree_data["max_depth"] = 1;
    }
  }

  function SaveNodesBelowRootAtTree(depth) {
    if (depth < 2 || 8 < depth) {
      return false;
    }
    const parent_depth = depth - 1;
    var is_new_node_inserted = false;
    for (var tree_index = 0; tree_index < tree_data[parent_depth].length; ++tree_index) {
      var tdata = tree_data[parent_depth][tree_index];
      for (var flat_index = 0; flat_index < flat_data.length; ++flat_index) {
        var fdata = flat_data[flat_index];
        if (tdata.key === fdata.parent_key) {
          var tmp = JSON.parse(JSON.stringify(node_info));
          tmp["name"] = fdata.name;
          tmp["key"] = fdata.key;
          tmp["parent_key"] = fdata.parent_key;
          tmp["children_names"] = [];
          tdata["children_names"].push(fdata.name);
          tree_data[depth].push(JSON.parse(JSON.stringify(tmp)));
          is_new_node_inserted = true;
        }
      }
      tdata["children_names"].sort();
    }
    tree_data[depth].sort(NodeCompareFunction);
    if (is_new_node_inserted) {
      tree_data["max_depth"] += 1;
    }
    return is_new_node_inserted;
  }

  function NodeCompareFunction(a, b) {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  }

  console.log("flat:", flat_data);
  console.log("tree:", tree_data);

  var current_select = {
    max_depth: 5,
    1: "C",
    2: "CB",
    3: "CBB",
    4: "CBB2",
    5: "CBB2B",
    6: "CBB2BD",
    7: "CBB2BDA",
    8: "CBB2BDA3",
  };

  for (var i = 1; i <= 8; ++i) {
    if (i == 1) {
      SetOptionsOfFirstSelect();
    } else {
      SetOptionsOfNthSelect(i);
    }
    $("#dept" + i).val(current_select[i]);
  }

  function SetOptionsOfFirstSelect() {
    tree_data["1"].map(function(val, index, arr) {
      $("#dept1").select().append(new Option(val.name, val.name));
    });
  }

  function SetOptionsOfNthSelect(N) {
    var current_parent_key = "";
    for (var i = 0; i < tree_data[N].length; ++i) {
      if (tree_data[N][i].name === current_select[N]) {
        current_parent_key = tree_data[N][i].parent_key;
        break;
      }
    }
    for (var i = 0; i < tree_data[N].length; ++i) {
      if (tree_data[N][i].parent_key === current_parent_key) {
        $("#dept" + N).select().append(
          new Option(tree_data[N][i].name, tree_data[N][i].name));
      }
    }
  }
  
  $("#dept1").select().on("change", function () {
    SelectChangedOnNthDepth(1);
  });
  $("#dept2").select().on("change", function () {
    SelectChangedOnNthDepth(2);
  });
  $("#dept3").select().on("change", function () {
    SelectChangedOnNthDepth(3);
  });
  $("#dept4").select().on("change", function () {
    SelectChangedOnNthDepth(4);
  });
  $("#dept5").select().on("change", function () {
    SelectChangedOnNthDepth(5);
  });
  $("#dept6").select().on("change", function () {
    SelectChangedOnNthDepth(6);
  });
  $("#dept7").select().on("change", function () {
    SelectChangedOnNthDepth(7);
  });
  $("#dept8").select().on("change", function () {
    SelectChangedOnNthDepth(8);
  });

  function SelectChangedOnNthDepth(N) {
    if (N < 1 || 8 < N) {
      return false;
    }
    if ($("#dept" + N).prop("disabled")) {
      return true;
    }
    current_select[N] = $("#dept" + N).select().val();
    for (var i = (N + 1); i <= 8; ++i) {
      SetDefaultSelect($("#dept" + i));
    }
    if (N === 8) {
      return true;
    }
    for (var i = 0; i < tree_data[N].length; ++i) {
      const node = tree_data[N][i];
      if (node.name === current_select[N]) {
        for (var idx = 0; idx < node["children_names"].length; ++idx) {
          $("#dept" + (N + 1)).select().append(
            new Option(node["children_names"][idx], node["children_names"][idx]));
        }
        break;
      }
    }
  }

  function SetDefaultSelect(select_html_element) {
    select_html_element.select().empty();
    select_html_element.select().append(new Option("선택", "None"));
  }
}
