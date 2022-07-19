use serde::{Deserialize, Serialize};
use serde_json;
use std::fs::metadata;
use std::fs::File;
use std::io::Read;
use walkdir::WalkDir;

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct WorkspaceFile {
 level: i32,
 file_name: String,
 extension: String,
 content: Vec<String>,
 path: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct Workspace {
 id: i32,
 workspace: String,
 workspace_type: String,
 files: Vec<WorkspaceFile>,
}

pub struct TemplateGenerator {}

impl TemplateGenerator {
 fn read_file_data(file_path: &str) -> std::io::Result<String> {
  let mut file = File::open(file_path).unwrap();
  let mut data = String::new();
  file.read_to_string(&mut data).unwrap();
  return Ok(data);
 }

 fn generate() {
  // TemplateGenerator::read_templates_directory();
  let mut output_workspaces: Vec<Workspace> = vec![];
  let workspaces = vec!["default-anchor-workspace", "default-solana-workspace"];
  for (ind, workspace) in workspaces.iter().enumerate() {
   let mut workspace_struct = Workspace {
    files: vec![],
    id: ind as i32,
    workspace: String::from(*workspace),
    workspace_type: if ind == 0 {
     String::from("ANCHOR")
    } else {
     String::from("SOLANA")
    },
   };
   let workspace_path = format!("{}{}", "./src/workspaces/", workspace);
   let entries = WalkDir::new(workspace_path)
    .into_iter()
    .filter_map(|v| v.ok());
   for (ind, entry) in entries.enumerate() {
    if ind > 0 {
     let path: &str = entry.path().to_str().unwrap();
     let md = metadata(path).unwrap();
     let mut level_index = usize::MIN;
     let token_path: Vec<&str> = path.split("/").collect::<Vec<&str>>();
     let file_name = String::from(*token_path.last().unwrap());
     let token_file_name = file_name.split(".").collect::<Vec<&str>>();
     let mut content = vec![];
     let mut extension = String::from("");
     if md.is_dir() {
      level_index = ind;
     } else if md.is_file() {
      let file_data = TemplateGenerator::read_file_data(path).unwrap();
      content.push(file_data);
      extension = String::from(token_file_name[1]);
     }
     workspace_struct.files.push(WorkspaceFile {
      level: level_index as i32,
      content,
      file_name: String::from(token_file_name[0]),
      extension: extension,
      path: String::from(path),
     });
    }
   }
   output_workspaces.push(workspace_struct);
  }

  let serialized_output = serde_json::to_string_pretty(&output_workspaces).unwrap();

  std::fs::write("./src/workspaces/output/data.json", &serialized_output).unwrap();
 }
}

#[test]
fn test_generate_template() {
 TemplateGenerator::generate();
}
