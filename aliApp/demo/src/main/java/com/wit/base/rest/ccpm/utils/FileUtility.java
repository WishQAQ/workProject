package com.wit.base.rest.ccpm.utils;

import java.net.URL;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FileUtility
{
    static {}

    public static FileType GetFileType(String ext)
    {
        if (ExtsDocument.contains(ext))
            return FileType.Text;

        if (ExtsSpreadsheet.contains(ext))
            return FileType.Spreadsheet;

        if (ExtsPresentation.contains(ext))
            return FileType.Presentation;

        return FileType.Text;
    }

    public static List<String> ExtsDocument = Arrays.asList
            (
                    "doc", "docx", "docm",
                    "dot", "dotx", "dotm",
                    "odt", "fodt", "ott", "rtf", "txt",
                    "html", "htm", "mht",
                    "pdf", "djvu", "fb2", "epub", "xps",
                    "wps", "wpt"
            );

    public static List<String> ExtsSpreadsheet = Arrays.asList
            (
                    "xls", "xlsx", "xlsm",
                    "xlt", "xltx", "xltm",
                    "ods", "fods", "ots", "csv",
                    "et", "ett"
            );

    public static List<String> ExtsPresentation = Arrays.asList
            (
                    "pps", "ppsx", "ppsm",
                    "ppt", "pptx", "pptm",
                    "pot", "potx", "potm",
                    "odp", "fodp", "otp",
                    "dps", "dpt"
            );

    public static Map<String, String> GetUrlParams(String url)
    {
        try
        {
            String query = new URL(url).getQuery();
            String[] params = query.split("&");
            Map<String, String> map = new HashMap<>();
            for (String param : params)
            {
                String name = param.split("=")[0];
                String value = param.split("=")[1];
                map.put(name, value);
            }
            return map;
        }
        catch (Exception ex)
        {
            return null;
        }
    }
}