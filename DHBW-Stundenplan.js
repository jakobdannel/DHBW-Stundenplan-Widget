const apiUrl = "https://api.stuv.app/rapla/lectures/MOS-TET20B"

let widget = await createWidget()
widget.backgroundColor = new Color("#000000")
if (!config.runsInWidget) {
  await widget.presentLarge()
}

Script.setWidget(widget)
Script.complete()

async function createWidget(items) {
  let fm = FileManager.local()
  let dir = fm.documentsDirectory()
  let path = fm.joinPath(dir, "scriptable-stuvapp.json")

  const list = new ListWidget()

  let now = new Date();

  try {
    let r = new Request(apiUrl)
    r.headers = {
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1"
    }

    let data, fresh = 0
    try {
      // Fetch data from api.stuv.app
      data = await r.loadJSON()
      // Write JSON to iCloud file
      fm.writeString(path, JSON.stringify(data, null, 2))
      fresh = 1
    } catch (err) {
      // Read data from iCloud file
      data = JSON.parse(fm.readString(path), null)
      if (!data) {
        const errorList = new ListWidget()
        errorList.addText("Unable to load json file.")
        return errorList
      }
    }

    const line1 = list.addText("Vorlesungsplan")
    line1.font = Font.mediumSystemFont(18)
    line1.centerAlignText()
    line1.textColor = Color.white()

    const line2 = list.addText(data[0].course)
    line2.centerAlignText()
    line2.textColor = Color.white()

    let maxCourses = 3
    let k = 0
    for (let i = 0; k < maxCourses; i++) {
      //  formatting of the time string to fit scriptable API
      let startTimeDate = new Date()
      let dF = new DateFormatter()
      dF.dateFormat = 'yyyy-MM-dd HH:mm:ss.SSSZ'
      let dstr = dF.string(startTimeDate)

      let startTime = data[i].startTime
      startTime = startTime.replace("T", ' ')
      startTime = dF.date(startTime)

      let endTime = data[i].endTime
      endTime = endTime.replace("T", ' ')
      endTime = dF.date(endTime)

      dF.dateFormat = "H:mm"
      let combinedTime = `${dF.string(startTime)} - ${dF.string(endTime)}`

      if (now < endTime) {
        const lecture1 = list.addDate(startTime)
        lecture1.applyDateStyle()
        lecture1.textColor = Color.gray()
        const lecture2 = list.addText(combinedTime)
        lecture2.textColor = Color.white()
        const lecture3 = list.addText(data[i].name)
        lecture3.font = Font.mediumSystemFont(18)
        if (data[i].type == "PRESENCE") {
          lecture3.textColor = Color.red()
        } else if (data[i].type == "ONLINE") {
          lecture3.textColor = Color.blue()
        }
        const lecture4 = list.addText(data[i].lecturer)
        lecture4.rightAlignText()
        lecture4.font = Font.mediumSystemFont(10)
        lecture4.textColor = Color.white()
        const lecture5 = list.addText(data[i].rooms[0])
        lecture5.rightAlignText()
        lecture5.font = Font.mediumSystemFont(12)
        lecture5.textColor = Color.white()
        k++
      }
    }
  } catch (err) {
    list.addText("Error fetching JSON from https://api.stuv.app")
    log(err)
  }
  const timestamp = list.addDate(now)
  timestamp.font = Font.mediumSystemFont(10)
  timestamp.applyTimeStyle()
  timestamp.textColor = Color.gray()
  timestamp.centerAlignText()
  return list
}
