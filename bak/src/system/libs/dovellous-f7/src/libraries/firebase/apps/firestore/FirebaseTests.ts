// ============================================================================
// MAIN
// ============================================================================

describe('Firestore Smoketests', () => {

    const app = initializeApp({}, 'tests');
    const db = getFirestore(app);
  
    it('should initialize a db with the default credential', () => {
      return initializeApp();
    });
  
    it('should get an empty document', () => {
      return getDocumentEmpty(db);
    });
  
    it('should delete existing documents', () => {
      return deleteCollection(db, 'cities', 50);
    });
  
    it('should store example data', () => {
      return exampleData(db);
    });
  
    it('should add quickstart data', () => {
      return quickstartAddData(db);
    });
  
    it('should query quickstart data', () => {
      return quickstartQuery(db);
    });
  
    it('should set a document', () => {
      return setDocument(db);
    });
  
    it('should manage data types', () => {
      return dataTypes(db);
    });
  
    it('should add a document', () => {
      return addDocument(db);
    });
  
    it('should add a document later', () => {
      return addLater(db);
    });
  
    it('should update a document', () => {
      return updateDocument(db);
    });
  
    it('should update array fields in a document', () => {
      return updateDocumentArray(db);
    });
  
    it('should update a document using numeric transforms', () => {
      return updateDocumentIncrement(db);
    });
  
    it('should update many documents', () => {
      return updateDocumentMany(db);
    });
  
    it('should update a missing doc', () => {
      return updateCreateIfMissing(db);
    });
  
    it('should update with server timestamp', () => {
      return updateServerTimestamp(db);
    });
  
    it('should handle transactions', () => {
      return transaction(db);
    });
  
    it('should handle transaction with a result', () => {
      return transactionWithResult(db).then(res => {
        // Delete data set
        return deleteCollection(db, 'cities', 50);
      });
    });
  
    it('should set more example data', () => {
      return exampleDataTwo(db);
    });
  
    it('should get document', () => {
      return getDocument(db);
    });
  
    it('should get multiple documents', () => {
      return getMultiple(db);
    });
  
    it('should get all documents', () => {
      return getAll(db);
    });
  
    it('should get all subcollections of a document', () => {
      getCollections(db);
    });
  
    it('should simple query', () => {
      return simpleQuery(db);
    });
  
    it('should query and filter', () => {
      return queryAndFilter(db);
    });
  
    it('should query and filter an array', () => {
      return arrayFilter(db);
    });
  
    it('should support array contains any', () => {
      return arrayContainsAnyQueries(db);
    });
  
    it('should support in queries', () => {
      return inQueries(db);
    });
  
    it('should order and limit', () => {
      return orderAndLimit(db);
    });
  
    it('should update and delete a field', () => {
      return updateDeleteField(db);
    });
  
    it('should update nested fields', () => {
      return updateNested(db);
    });
  
    it('should update in a batch', () => {
      updateBatch(db);
    });
  
    it('should delete doucment', () => {
      return deleteDocument(db);
    });
  
    it('should stream query data', (done) => {
      streamSnapshot(db, done);
    });
  
    it('should listen with diffs', (done) => {
      listenDiffs(db, done);
    });
  
    it('should stream doc data', (done) => {
      streamDocument(db, done);
    });
  
    it('should support simple cursors', () => {
      return simpleCursors(db);
    });
  
    it('should support snapshot cursors', () => {
      return snapshotCursors(db);
    });
  
    it('should support pagination', () => {
      return paginateQuery(db);
    });
  
    it('should support multiple cursor conditions', () => {
      return multipleCursorConditions(db);
    });
  
    it('should delete the whole collection', () => {
      return deleteCollection(db, 'cities', 50);
    });
  
    it('should find all museums when querying a collection group', () => {
      return collectionGroupQuery(db);
    });
  });