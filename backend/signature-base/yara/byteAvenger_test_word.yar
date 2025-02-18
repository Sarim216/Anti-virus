rule BYTE_AVENGER_TEST_WORD {
   meta:
      description = "Detection of word file designed as a harmless test sample for Xylent Antimalware"
      author = "FINAL YEAR PROJECT"
      reference = "TODO_ADD_GITHUB_REFERENCE"
      score = 90
   strings:
      $header = { D0 CF 11 E0 A1 B1 1A E1 }
      $s1 = "MD"
      $s2 = "DANISH"
      $s3 = "BYTE_AVENGER"
   condition:
      $header at 0 and all of ($s*)
}
