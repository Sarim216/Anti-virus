rule BYTE_AVENGER_TEST_PDF {
	meta:
		description = "Detection of word file designed as a harmless test sample for Xylent Antivirus"
      	author = "Final Year Project"
      	reference = "ADD_GITHUB_REFERENCE"
        score = 90	

	strings:
        $magic = { 25 50 44 46 }
		$s1 = "MD"
		$s2 = "DANISH"
		$s3 = "BYTEAVENGER"

	condition:
		$magic at 0 and all of ($s*)
}