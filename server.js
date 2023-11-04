const fs = require("fs");

const logMessage = "SCRIPT STARTED";

fs.appendFile("/home/user/files/code/hx-gpt/lsp.log", logMessage, (err) => {
  if (err) throw err;
});

const {
  createConnection,
  TextDocuments,
  ProposedFeatures,
} = require("vscode-languageserver");

// Create a connection for the server. The connection uses Node's IPC as a transport.
let connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager. The text document manager
// supports full document sync only.
let documents = new TextDocuments();

// After the server has started the client sends an initialize request. The server receives
// in the passed params the rootPath of the workspace plus the client capabilities.
connection.onInitialize((params) => {
  return {
    capabilities: {
      textDocumentSync: documents.syncKind,
    },
  };
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent((change) => {
  let logMessage = `[Server(${process.pid}) ${new Date()}] Document in ${
    change.document.uri
  } has been updated\n`;

  fs.appendFile("/home/user/files/code/hx-gpt/lsp.log", logMessage, (err) => {
    if (err) throw err;
  });
});

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
