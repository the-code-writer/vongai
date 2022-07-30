import iconMimeImage  from "../../../assets/img/mime/1/image.png";
import iconMimeVideo  from "../../../assets/img/mime/1/video.png";
import iconMimeMedia  from "../../../assets/img/mime/1/media.png";
import iconMimeAudio  from "../../../assets/img/mime/1/music.png";
import iconMimeRecord from "../../../assets/img/mime/1/record.png";
import iconMimeDOC    from "../../../assets/img/mime/1/doc.png";
import iconMimeXLS    from "../../../assets/img/mime/1/xls.png";
import iconMimePPT    from "../../../assets/img/mime/1/ppt.png";
import iconMimeZIP    from "../../../assets/img/mime/1/zip.png";
import iconMimeTXT    from "../../../assets/img/mime/1/text.png";
import iconMimePDF    from "../../../assets/img/mime/1/pdf.png";
import iconMimeAPK    from "../../../assets/img/mime/1/apk.png";

const MimeTypes = {

    getFileIcon : (mime: any) => {

        let fileIcon: any;

        switch (mime) {

            case "doc":
            case "docx": {
                fileIcon = iconMimeDOC;
                break;
            }

            case "xls":
            case "xlsx": {
                fileIcon = iconMimeXLS;
                break;
            }

            case "ppt":
            case "pptx": {
                fileIcon = iconMimePPT;
                break;
            }

            case "pdf": {
                fileIcon = iconMimePDF;
                break;
            }

            case "mp3":
            case "wav":
            case "wma":
            case "mid": {
                fileIcon = iconMimeAudio;
                break;
            }

            case "jpg":
            case "jpeg":
            case "tiff":
            case "png":
            case "bmp":
            case "svg": {
                fileIcon = iconMimeImage;
                break;
            }

            case "mp4":
            case "mpeg":
            case "avi":
            case "mov":
            case "3gp": {
                fileIcon = iconMimeVideo;
                break;
            }

            case "zip":
            case "rar":
            case "tar":
            case "tar.gz":
            case "gz":
            case "7z": {
                fileIcon = iconMimeZIP;
                break;
            }

            case "rec": {
                fileIcon = iconMimeRecord;
                break;
            }

            case "txt":
            case "text":
            case "rtf":
            case "html": {
                fileIcon = iconMimeTXT;
                break;
            }

            case "media": {
                fileIcon = iconMimeMedia;
                break;
            }

            case "apk": {
                fileIcon = iconMimeAPK;
                break;
            }

            default : {
                fileIcon = iconMimeTXT;
                break;
            }

        }

        return fileIcon;

    }

}

export default MimeTypes;