/**
 * 改变日志合并
 * Created by jahv on 2017/6/22.
 */
import fs from 'fs'
import path from 'path'
import moment from 'moment'
import readline from 'readline'

let changelogList = [];

function dir(path) {
  fs.readdirSync(path).forEach(file => {
    let newPath = path + "/" + file
      , stat = fs.lstatSync(newPath);
    if (stat.isDirectory()) {
      dir(newPath);
    } else if (newPath.endsWith("/CHANGELOG.md")) {
      changelogList.push(newPath);
    }
  })
}

dir(path.join(__dirname, "../scripts"));
dir(path.join(__dirname, "../doc"));
dir(path.join(__dirname, "../server"));
dir(path.join(__dirname, "../src"));

function dome() {
}

function begin() {
  if (changelogList.length > 0) {
    const version = require("../package.json").version;
    const logPath = path.join(__dirname, "../CHANGELOG.md");
    const oldLog = fs.readFileSync(logPath);
    let newLog = "# v" + version + "\n\n";
    const now = moment(new Date()).format("YYYY年M月D日");
    let writeChild = false;
    changelogList.forEach((childLogPath, i) => {
      const rl = readline.createInterface({
        input: fs.createReadStream(childLogPath)
      });
      let lineNumber = 0, childLog = "";
      rl.on('line', line => {
        let oldLine = line;
        if (lineNumber === 0 && !line.startsWith("### ")) {
          throw `error title: ${childLogPath}`
        } else if (lineNumber === 1) {
          if (!line.startsWith("> ")) {
            throw `error date: ${childLogPath}`
          }
          if (!line.endsWith(now)) {
            line = line + " - " + now;
          }
          oldLine = "> " + now;
        } else if (lineNumber === 2 && line.length !== 0) {
          throw `error split: ${childLogPath}`
        }
        newLog += line + "\n";
        if (lineNumber <= 1) childLog += oldLine + "\n";
        lineNumber++;
      }).on('close', () => {
        if (lineNumber > 2) {
          fs.writeFileSync(childLogPath, childLog);
          writeChild = true;
        } else {
          console.log("empty CHANGELOG.md");
        }
        if (i === changelogList.length - 1) {
          if (writeChild) {
            fs.writeFileSync(logPath, newLog + "\n" + oldLog);
            console.log("build changelog successful");
          } else {
            console.log("build changelog successful, but noting change!");
          }
          dome();
        }
      })
    })
  } else {
    console.log("not find CHANGELOG.md");
    dome();
  }
}

export default function (back) {
  dome = back;
  begin();
}