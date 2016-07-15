g.V()
 .hasLabel("collection")
 .has("collectionName", "wwdocuments")
 .out("hasEntityNode")
 .out("hasEntity")
 .where(__.not(out("isCreatedBy")))
 .map {
   "http://test.repository.huygens.knaw.nl/v2.1/domain/wwdocuments/" + it.get().value("tim_id") + "\r\n"
 }